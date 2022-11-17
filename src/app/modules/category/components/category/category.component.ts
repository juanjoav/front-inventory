import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns:string[] = ['id','categoryName','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories() {
    this.categoryService.getCategories().subscribe((data:any) => {
      console.log("Respuesta categories: ",data);
      this.processCategoriesResponse(data);
    }, (error) => {
      console.log("Error categories: ",error);
    });
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.categories;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }

  openCategoryDialog() {
      const dialogRef = this.dialog.open(NewCategoryComponent , {
        width: '450px'
      });

      dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1) {
          this.openSnackBar("Categoria agregada", "Exitosa");
          this.getCategories();
        } else if(result == 2){
          this.openSnackBar("Categoria no agregada", "Fallo");
        }
      } );
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef <SimpleSnackBar>{
    return this.snackBar.open(message,action, {
      duration: 2000
    });
  }

}


export interface CategoryElement{
  description: string;
  id: number;
  categoryName: string;
}
