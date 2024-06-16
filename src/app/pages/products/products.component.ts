import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  products: Product[] = [];
  categories: Category[] = [];
  filter: string = 'all';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  setFilter(filter: string) {
    this.filter = filter;
    this.getAllProducts();
  }

  getAllProducts() {
    this.subscriptions.add(
      this.productService
        .getAllProducts(this.filter)
        .subscribe((products) => (this.products = products))
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.categoryService
        .getAllCategories()
        .subscribe((categories) => (this.categories = categories))
    );
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
