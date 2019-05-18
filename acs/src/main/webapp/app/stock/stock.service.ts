import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import {Article} from '../shared/article/article.entity';

const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

@Injectable()
export class StockService {
    
    private listArticles = 'acs/articles/';
    
    constructor(private http: HttpClient) { }
    
    getUsers(): Observable<Article[]> {
        return this.http.get(this.listArticles) as Observable<Article[]>;
    }
    
    modifUser(article:Article) :  Observable<string> {
        return this.http.post<string>(this.listArticles, article, httpOptions);
    }
    
}