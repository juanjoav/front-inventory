import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private categoryServices: CategoryService, private dialogRef: MatDialogRef<NewCategoryComponent>) {

    this.categoryForm = this.fb.group({
      categoryName: ['',Validators.required],
      description:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSave(){

    let data = {
      categoryName: this.categoryForm.get('categoryName')?.value,
      description: this.categoryForm.get('description')?.value
    }

    this.categoryServices.saveCategories(data).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close(1);
    }), (error:any) => {
      this.dialogRef.close(2);
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
