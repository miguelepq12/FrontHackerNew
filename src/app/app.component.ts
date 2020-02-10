import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {New} from './news/new';
import {NewService} from './news/new.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private newsService: NewService) { }
  displayedColumns: string[] = ['title', 'author', 'createAt', 'delete'];

  dataSource = new MatTableDataSource<New>();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getNews();
  }

  private getNews() {
    this.newsService.getNews().subscribe(
      response => {
        this.dataSource.data=response;
      }
    );
  }

  private delete(n) {
    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar la noticia ${n.title} `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.newsService.delete(n.id).subscribe(
          response => {
            this.dataSource.data = this.dataSource.data.filter(ne => ne !== n);
            swal.fire(
              'Noticia eliminada',
              `Noticia ${n.title} eliminado con éxito.`,
              'success'
            );
          }
        );
      }
    });
  }
}
