import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/MODELS/Category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  baseUrl =''

  constructor(private http: HttpClient) { }

  categorybaseUrl:string='https://localhost:7143/api/Category';
  // listCategory:Category[]=[]; //for getting list

  categoryData:Category=new Category(); //for posting data

  getMostProfit(topN:any) {
    const baseUrla = "http://localhost:8080/products/profit/"+topN;
    return this.http.get<any>(baseUrla);
  }

  getMostPopular(topN:any) {
    const baseUrla = "http://localhost:8080/products/popular/"+topN;
    return this.http.get<any>(baseUrla);
  }

  insertCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.categorybaseUrl,category);
  }

  updateCategory(category:Category):Observable<Category>{
    return this.http.put<Category>(this.categorybaseUrl,category);
  }


  getCategories():Observable<Category[]>{
  return this.http.get<Category[]>(this.categorybaseUrl);
  }


  deleteCategory(id:number):Observable<Category>{
    return this.http.delete<Category>(this.categorybaseUrl +'/' +id);

  }

  getCategoryById():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.categorybaseUrl}/${this.categoryData.id}`);
  }

  getCategoryByName():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.categorybaseUrl}/${this.categoryData.categoryName}`);
  }
}
