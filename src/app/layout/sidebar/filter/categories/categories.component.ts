import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { first } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [FormsModule, NgFor, CheckboxModule],
})
export class CategoriesComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

  public categories!: Categories[];

  public selectedCategories!: Categories[];

  public ngOnInit(): void {
    this._categoriesService
      .getAllCategories()
      .pipe(first())
      .subscribe(category => {
        console.log(category);
        this.categories = category;
      });
  }

  public handlerSelectedCategories(): void {
    return console.log(this.selectedCategories);
  }
}
