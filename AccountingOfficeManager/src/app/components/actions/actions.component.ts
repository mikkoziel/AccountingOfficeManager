import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { Document } from 'src/app/entity/document';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FileValidator } from 'ngx-material-file-input';
import { refreshComponent } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  currentUser: User

  documents: Array<Document>
  docDisplayedColumns: string[] = ['id', 'description', 'download'];

  form: FormGroup;

  // readonly maxSize = 104857600; //5 MB (=5 * 2 ** 20).
  spinnerFlag = 0;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required]
    });
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.clientService.getDocumentForClient(this.currentUser?.id).subscribe(res=>{
        this.documents = res;
        this.spinnerFlag += 1;
      })
    })
  }

  addDocument(){
    this.clientService.addDocument({
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      file: this.form.get('file').value.files[0],
      user_id: this.currentUser.id
    }).subscribe(()=>{
      refreshComponent(this.router)
    })
  }

  downloadFile(id){
    console.log(id)
    this.clientService.getDocument(id).subscribe((res: Blob)=>{
      let doc = this.documents.find(i => i.document_id === id).path;
      let name = doc.substring(doc.lastIndexOf("\\") + 1, doc.length)
      saveAs(res, name);
    })

  }

}
