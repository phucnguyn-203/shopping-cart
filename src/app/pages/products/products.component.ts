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

  currentPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 10;
  itemsPerPage: number = 10;
  pagesToShow: number = 5;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.categoryService
        .getAllCategories()
        .subscribe((categories) => (this.categories = categories))
    );
    this.getAllProducts();
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.getAllProducts();
  }

  getAllProducts() {
    this.subscriptions.add(
      this.productService.getAllProducts(this.filter).subscribe((products) => {
        this.products = products;
        this.totalItems = products.length;
      })
    );
  }

  getPaginationRange(): (string | number)[] {
    const start = Math.max(
      1,
      this.currentPage - Math.floor(this.pagesToShow / 2)
    );
    const end = Math.min(this.totalPages, start + this.pagesToShow - 1);

    console.log(start, end);

    let pages: (string | number)[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    console.log(pages);
    if (start > 1) {
      pages = [1, '...'].concat(pages);
    }
    if (end < this.totalPages) {
      pages = pages.concat(['...', this.totalPages]);
    }

    return pages;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
