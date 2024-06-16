import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.productService
        .getFeturedProducts()
        .subscribe((products) => (this.featuredProducts = products))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackById(index: number, product: Product) {
    return product.id;
  }
}
