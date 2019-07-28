import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';


const url = 'http://localhost:8000/api/upload'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}

  public upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> } }
  {
    const status: {[key: string]: {progress: Observable<number>} } = {}
    files.forEach(file => {
      // creates a form for fileupload
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true});
      // keeps track of progress of upload
      const progress = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        } else if (event.type === HttpEventType.Response) {
          progress.complete();
        }
      });
      status[file.name] = {
      progress: progress.asObservable()
    };
    })
    return status;
  }

  handleError(error){

  }
}
