import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy{

  deleteArticleSubscription: Subscription = new Subscription();

  constructor(private articleService: ArticleService) {}
  

  @Input() article: Article = new Article();   //id-ul din functii vine de aici
  @Output() newGetArticleEvent = new EventEmitter<string>();
  @Output()
  editEvent = new EventEmitter<Article>();

  ngOnInit(): void {
    
  }

  deleteArticle(id: number){
      this.deleteArticleSubscription = this.articleService.deleteArticle(id).subscribe(() => {
        this.newGetArticleEvent.emit();      //creez un eveniment si in home il mapez catre ceva
      });
  }

  editArticle(article: Article) {
    this.editEvent.emit(article);
  }

  ngOnDestroy(): void {
    this.deleteArticleSubscription.unsubscribe();
  }

}
