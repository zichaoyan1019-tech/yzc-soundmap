import { useMemo, useState } from 'react'
import './App.css'

const locations = [
  {
    id: 'cathedral',
    title: 'Cathedral of Buenos Ayres',
    label: 'Cathedral',
    coordinates: { top: '58.5%', left: '48.8%' },
    heroImage: {
      src: '/media/cathedral.webp',
      alt: 'Cathedral of Buenos Ayres façade'
    },
    sections: [
      {
        heading: 'Where',
        body: 'Located in the Plaza Mayor (now Plaza de Mayo), the central square of colonial Buenos Aires.'
      },
      {
        heading: 'Religious Role',
        body: 'Seat of the bishop and principal cathedral of Buenos Aires. Hosted daily Masses, Vespers, feast day liturgies, and launched Corpus Christi processions.'
      }
    ],
    composers: [
      {
        heading: 'Composers and Works',
        body: 'Domenico Zipoli (1688–1726) — Missa a San Ignacio.'
      }
    ],
    feature: {
      heading: 'Feature',
      image: {
        src: '/media/Missa a San Ignacio.png',
        alt: 'Manuscript of Missa a San Ignacio'
      },
      body: 'Missa a San Ignacio: jubilant polyphonic textures, alternation between choir and soloists, and lively counterpoint suited to festive grandeur.'
    },
    audio: {
      src: '/media/Missa a San Ignacio.m4a',
      label: 'Missa a San Ignacio'
    }
  },
  {
    id: 'plaza',
    title: 'Plaza Mayor',
    label: 'Plaza',
    coordinates: { top: '61%', left: '48.6%' },
    heroImage: {
      src: '/media/plaza.jpeg',
      alt: 'Plaza Mayor in colonial Buenos Aires'
    },
    sections: [
      {
        heading: 'Where',
        body: "Directly in front of the cathedral, serving as Buenos Aires's principal public square."
      },
      {
        heading: 'Religious and Social Role',
        body: 'Venue for civic-religious ceremonies such as Corpus Christi and Christmas celebrations, gathering clergy, confraternities, townspeople, Indigenous, and African groups in collective processions.'
      }
    ],
    composers: [
      {
        heading: 'Composers and Works',
        body: 'Juan de Araujo (1646–1712) — Dime, amor (villancico for four voices).'
      }
    ],
    feature: {
      heading: 'Feature',
      image: {
        src: '/media/Dime, amor.png',
        alt: 'Score excerpt of Dime, amor'
      },
      body: 'Devotional text with striking imagery (“fire and frost embrace each other”), rhythmic vitality with syncopation, and harp accompaniment linking Iberian traditions with New World performance.'
    },
    audio: {
      src: '/media/Dime-amor.m4a',
      label: 'Dime, amor'
    }
  },
  {
    id: 'pampas',
    title: 'The Pampas',
    label: 'Pampas',
    coordinates: { top: '18%', left: '50%' },
    heroImage: {
      src: '/media/Pamaps.png',
      alt: '1779 Vértiz y Salcedo frontier map of the Pampas'
    },
    sections: [
      {
        heading: 'Location',
        body: 'The Pampas surrounding Buenos Aires in the 17th–18th centuries—open grasslands directly beyond the city grid and port.'
      },
      {
        heading: 'Frontier Line Map',
        body: 'The 1779 frontier line map by Vértiz y Salcedo shows forts and outposts cutting through the plain, marking where new colonial sounds entered the natural field.'
      }
    ],
    composers: [],
    feature: {
      heading: 'Soundscape',
      body: 'Wind across the open plain; birds such as rhea and meadowlarks; insects; Indigenous ritual sounds—drums, rattles, song. After pastoral expansion: cattle lowing, hoofbeats, whips, branding calls, and the bells, drums, and commands of military posts along routes and river crossings.'
    },
    audio: {
      src: '/media/pamaps bird.mp3',
      label: 'Pampas Field Recording'
    },
    video: {
      src: '/media/pamaps deer.mp4',
      caption: 'Frontier wildlife in motion — visualizing the acoustic landscape.'
    }
  }
]

function App() {
  const [activeId, setActiveId] = useState(null)
  const activeLocation = useMemo(
    () => locations.find((location) => location.id === activeId) ?? null,
    [activeId]
  )

  return (
    <div className="app">
      <header className="app__header">
        <h1>Colonial Buenos Aires Soundmap</h1>
        <p>Click the points on the Old Town map to explore sounds and stories from Buenos Aires’s colonial period.</p>
        <p>Group members: Zichao Yan; Seola Park</p>
      </header>

      <main className="app__map-wrapper">
        <div className="map">
          <img src="/media/map.png" alt="殖民时期布宜诺斯艾利斯地图" className="map__image" />

          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              className="map__marker"
              data-label={location.label}
              style={location.coordinates}
              onClick={() => setActiveId(location.id)}
              aria-label={location.title}
            />
          ))}

          {activeLocation && (
            <div className="info-layer" role="dialog" aria-modal="true">
              <button
                type="button"
                className="info-layer__backdrop"
                onClick={() => setActiveId(null)}
                aria-label="关闭介绍"
              />

              <section className="info-card">
                <div className="info-card__header">
                  <h2>{activeLocation.title}</h2>
                  <button
                    type="button"
                    className="info-card__close"
                    onClick={() => setActiveId(null)}
                    aria-label="关闭介绍"
                  >
                    ×
                  </button>
                </div>

                <div className="info-card__body">
                  {(activeLocation.heroImage || activeLocation.sections?.length) && (
                    <div className="info-card__hero-row">
                      {activeLocation.heroImage && (
                        <img src={activeLocation.heroImage.src} alt={activeLocation.heroImage.alt} />
                      )}

                      {activeLocation.sections?.length > 0 && (
                        <div className="info-card__sections">
                          {activeLocation.sections.map((section) => (
                            <article key={section.heading}>
                              <h3>{section.heading}</h3>
                              <p>{section.body}</p>
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeLocation.composers?.length > 0 && (
                    <div className="info-card__composers">
                      {activeLocation.composers.map((composer) => (
                        <div key={composer.heading}>
                          <h3>{composer.heading}</h3>
                          <p>{composer.body}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeLocation.feature && (
                    <figure className="info-card__feature">
                      {activeLocation.feature.image && (
                        <img src={activeLocation.feature.image.src} alt={activeLocation.feature.image.alt} />
                      )}
                      <figcaption>
                        <strong>{activeLocation.feature.heading}:</strong> {activeLocation.feature.body}
                      </figcaption>
                    </figure>
                  )}

                  {activeLocation.audio && (
                    <div className="info-card__audio">
                      <h3>{activeLocation.audio.label}</h3>
                      <audio controls>
                        <source src={activeLocation.audio.src} />
                        你的浏览器不支持音频播放，请下载文件收听。
                      </audio>
                    </div>
                  )}

                  {activeLocation.video && (
                    <figure className="info-card__video">
                      <video controls>
                        <source src={activeLocation.video.src} />
                        你的浏览器不支持视频播放，请下载文件观看。
                      </video>
                      {activeLocation.video.caption && <figcaption>{activeLocation.video.caption}</figcaption>}
                    </figure>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
