import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import Player from '@vimeo/player'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'

/**
 * Vimeo API calls
 * https://developer.vimeo.com/api/common-formats#common-parameters
 *
 * Vimeo Player
 * https://github.com/vimeo/player.js
 */

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${environment.vimeo.token}`,
    }),
  }

  constructor(private http: HttpClient) {}

  /**
   * Return the videos from an specified group
   */
  getGroupVideos(groupId: number) {
    return this.http
      .get<any>(
        `${environment.vimeo.api}/groups/${groupId}/videos`,
        this.httpOptions
      )
      .pipe(
        map((res) => {
          return res.data
        })
      )
  }

  /**
   * Return the videos from an specified group
   */
  getVideoCategories() {
    return this.http
      .get<any>(`${environment.vimeo.api}/categories`, this.httpOptions)
      .pipe(
        map((res) => {
          return res.data
        })
      )
  }

  /**
   * Creates a player with the ID of the video and play it automatically
   */
  playVideo(videoId: number) {
    const player = new Player('vimeo-player', {
      id: videoId,
      playsinline: true,
      width: 375,
    })
    player.play()

    player.on('ended', () => {
      player.destroy()
    })
  }
}
