import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from '../../../core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskForm: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(private fb: FormBuilder,
              private tasksService: TasksService,
              private navCtrl: NavController,
              private overlayService: OverlayService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  private init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Edit Task';
    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const task = !this.taskId
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
          id: this.taskId,
          ...this.taskForm.value
        });
      this.navCtrl.navigateBack('/tasks');
    } catch (e) {
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }

}
