import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskForm: FormGroup;

  constructor(private fb: FormBuilder,
              private tasksService: TasksService,
              private navCtrl: NavController) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const task = await this.tasksService.create(this.taskForm.value);
      console.log('Task Created! ', task);
      this.navCtrl.navigateBack('/tasks');
    } catch (e) {
      console.log('Error while creating new Task: ', e);
    }
  }

}
