import { Component, OnInit } from '@angular/core';
import { UserClaimInfo } from 'src/app/models/userClaimInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-claim-operations',
  templateUrl: './claim-operations.component.html',
  styleUrls: ['./claim-operations.component.css']
})
export class ClaimOperationsComponent implements OnInit {
  users:UserClaimInfo[] = [];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.userService.getAllUserDetail().subscribe(response=>{
      this.users = response.data;
      console.log(this.users);
    })
  }

}
