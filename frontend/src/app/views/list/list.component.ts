import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, Subject, debounceTime } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Shared } from 'src/app/shared/shared';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Entity } from '../entity/models/entity';
import { loadEntities } from 'src/app/store/global.action';
import { GlobalState } from 'src/app/models/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, AfterViewInit {
  entities$!: Observable<Entity[]>
  /**
   * Resize
   */
  clientWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.clientWidth = window.innerWidth;
    this.setColumns();
  };
  /*************************************** */
  /**
   * Search Input
   */
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchInputTerm$ = new Subject<string>();
  searchInputModel!: string | null;
  /*************************************** */
  /**
   * Entities table
   */
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Entity> = new MatTableDataSource();
  displayedColumns!: string[];
  pageSize: number = 10;
  totalItems$!: Observable<number>;
  /*************************************** */

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router,
    private shared: Shared,
    private cd: ChangeDetectorRef,
    private store: Store<{ global: GlobalState }>
    ) {
      this.entities$ = this.store.select(state => state.global.entities);
      this.totalItems$ = this.store.select(state => state.global.entities.length);

    /**
     * Seach Input
     */
      this.searchInputTerm$
      .pipe(
        debounceTime(500)
      )
      .subscribe({
        next: (res: string) => {
          router.navigate([], (
            res?.trim().length
            ? { queryParams: { search: shared.slugify(res) }}
            : undefined
          ));
        },
        error: (error) => {
          console.error(error);
        },
      });
    /*************************************** */

    /**
     * Subscribes to the search params
     */
      this.route.queryParams.subscribe((params: Params) => {
        this.searchInputModel = this.shared.unSlugify(params['search'] ?? '');

        this.store.dispatch(loadEntities({
          search: this.shared.unSlugify(this.searchInputModel)
        }));

        // this.listService.getList({
        //   search: this.shared.unSlugify(this.searchInputModel)
        // }).then((list: Entity[]) => {
        //   this.initTable(list);
        //   this.tableData = list;
        //   this.cd.markForCheck();
        // })
      });
  }

  ngOnInit() {
    this.initTable()

    this.store.select(state => state.global.entities).subscribe((data: Entity[]) => {
      this.tableData = data;
      this.cd.markForCheck();
    })
  }

  ngAfterViewInit(): void {
    if(!this.dataSource.paginator && this.paginator)
      this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
    this.cd.markForCheck();
  }

  get tableData(): Entity[] {
    return this.dataSource.data;
  }

  set tableData(data: Entity[]) {
    this.dataSource.data = data;
  }

  private initTable(): void {
    this.tableData = [];
    this.dataSource.sort = this.sort;

    this.setColumns();
    this.cd.markForCheck();
  }

  private setColumns() {
    const tableBreakpoints ={
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }

    // Mobile(sm)
    if(this.clientWidth < tableBreakpoints.sm ){
      this.displayedColumns = ['fantasy_name'];
    }
    // Mobile/Desktop(md)
    else if(this.clientWidth < tableBreakpoints.md) {
      this.displayedColumns = ['fantasy_name', 'region'];
    }
    // Desktop(lg+)
    else  {
      this.displayedColumns = ['fantasy_name', 'region', 'medical_specialties', 'active', 'actions'];
    }

    this.paginator?._changePageSize(this.pageSize);
  }

  handlePageEvent(event: PageEvent) {
    let { pageIndex, pageSize } = event;

    if(event.previousPageIndex !== event.pageIndex)
      this.store.dispatch(loadEntities({ pageIndex, pageSize }));
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    this.searchInputTerm$.next(inputValue);
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onViewClick(el: Entity) {
    this.router.navigate(['list', this.shared.slugify(el.id)]);
  }

  onEditClick(el: Entity) {
    this.router.navigate(['list', this.shared.slugify(el.id), 'editar']);
  }
}
