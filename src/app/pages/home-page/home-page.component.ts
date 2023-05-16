import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{

  articleSubscription: Subscription = new Subscription();
  articleList: Article[] = [];
  isLoading = false;
  showModal: boolean = false;
  article = new Article();

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void{
      //initializam home
      this.getArticles();
  }

  //era in init, am separat-o
  getArticles(){
    this.isLoading = true;
    this.articleSubscription = this.articleService.getArticles().subscribe((articleList) => {
      this.articleList = articleList;
    })
    this.isLoading = false;
  }

  openAddModal() {
    this.article =  new Article();
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openEditModal(article: Article) {
    this.article = article;
    this.toggleModal();
  }

  ngOnDestroy(): void {
    //am facut subscribe in init si aici facem unsubscribe
    this.articleSubscription.unsubscribe();
  }
}
