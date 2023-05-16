import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) { }

getArticles(): Observable<Article[]>{
  return this.http.get<Article[]>('http://localhost:3000/articles');
}

deleteArticle(id: number): Observable<Article[]>{
  return this.http.delete<Article[]>(`http://localhost:3000/articles/${id}`);
}

//pt modala
postArticle(article: Article): Observable<Article> {
  return this.http.post<Article>(this.articlesUrl, article);
}

putArticle(article: Article, id: number): Observable<Article> {
  const url = `${this.articlesUrl}/${id}`;
  return this.http.put<Article>(url, article);
}

getArticleById(id: string): Observable<Article> {
  const url = `${this.articlesUrl}/${id}`;
  return this.http.get<Article>(url);
}

}
