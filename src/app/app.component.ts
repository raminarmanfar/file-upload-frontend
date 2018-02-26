import { Component, OnInit, ElementRef, ViewChild, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';






const URL = 'http://localhost:3002/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent {
  title = 'app';

  form: FormGroup;
  loading: boolean = false;
  data: any;
  displayedColumns = ['_id', 'originalName', 'description', 'categorie', 'actions'];
  dataSource: any;
  _id: string;
  description: string;
  categorie: string;
  downloadLink: string;
  originalName: string;
  rowFile: rowElement;
  newFile: boolean = true; 

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient, public dialog: MatDialog) {
    this.createForm();    
    this.dataSource = new MatTableDataSource();
    this.getFilesList();

    this._id = "";
    this.description = "";
    this.categorie = "";
    this.downloadLink = "";
    this.originalName = "";

    let defaultFile: rowElement = {
      _id: "",
      originalName: "",
      description: "",
      categorie: "",
      downloadLink: ""
    };

    this.rowFile = defaultFile;

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  createForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      fileData: null
    });
  }
  
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('fileData').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here    
    input.append('description', this.form.get('description').value);
    input.append('categorie', this.form.get('categorie').value);
    input.append('isNewFile', this.newFile.toString());
    if (!this.newFile) {
      input.append('_id', this.rowFile._id);
    }
    input.append('file', this.form.get('fileData').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    
    this.http.post('http://localhost:3002/post-data', formModel)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {this.getFilesList();}
    );        
  }

  clearFile() {
    this.form.get('fileData').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onSelectChange = ($event: any): void => {
    if ($event.index == 1) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  info = (entity): void => {
    this.newFile = false;
    this.rowFile = entity;
    this.rowFile._id = entity._id;
    this.rowFile.originalName = entity.originalName;
    this.rowFile.description = entity.description;
    this.rowFile.categorie = entity.categorie;
    this.rowFile.downloadLink = "http://localhost:3002/get-file/" + entity._id;
  }

  deleteFile(id) {    
    var deleteFileUrl = 'http://localhost:3002/delete-file/' + id;
    this.http.get(deleteFileUrl).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {this.getFilesList();} 
    );
  }

  openAddFileDialog() {    
    
    let entity : rowElement =  {
      _id: "",
      originalName: "",
      description: "",
      categorie: "",
      downloadLink: ""
    };
    //!!! BUG
    this.rowFile= entity;    
    this.newFile = true;
  }

  getFilesList() {
    var self = this;
    this.http.get('http://localhost:3002/get-files').subscribe(data => {
      self.data = data;
      self.loading = false;
    });        
  }

  openDialog(entity): void {
    this.info(entity);
    var self = this;
    let dialogRef = this.dialog.open(DialogDelete, {
      width: '250px',
      data: {originalName: this.rowFile.originalName, _id: this.rowFile._id}    
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result) {
        self.deleteFile(entity._id);
      }           
    });
  }  
}

export interface Element {
  _id: any;
  name: string;
  categorie: string;
  description: string;
}

export class rowElement {
  _id: string;
  originalName: string;
  categorie: string;
  description: string;
  downloadLink: string;
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})

export class DialogDelete {  
    constructor(
      public dialogRef: MatDialogRef<DialogDelete>,
      private http: HttpClient,      
      @Inject(MAT_DIALOG_DATA) public data: any) { }
                  
    onNoClick(): void {
      this.dialogRef.close();
    }       
}

