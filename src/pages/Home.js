import React, { useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Grid, LinearProgress } from '@mui/material';
import BookCard2 from '../components/book/BookCard2'
import "../css/home.css";
import "../css/media-scroll.css";
import { bookService } from '../services/books.services';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState({
    "total": 81,
    "pageIndex": 1,
    "pageSize": 10,
    "data": []
  })
  const [data, setData] = useState([])
  const [dataHot, setDataHot] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  function throttle(cb, delay = 10) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }

    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }

      cb(...args)
      shouldWait = true
      setTimeout(timeoutFunc, delay)
    }
  }

  function calculateProgressBar(progressBar) {
    progressBar.innerHTML = ""
    const slider = progressBar.closest(".container-book").querySelector(".slider")
    const itemCount = 12
    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue("--items-per-screen")
    )
    let sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
    if (sliderIndex >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      sliderIndex = progressBarItemCount - 1
    }

    for (let i = 0; i < progressBarItemCount; i++) {
      const barItem = document.createElement("div")
      barItem.classList.add("progress-item")
      if (i === sliderIndex) {
        barItem.classList.add("active")
      }
      progressBar.append(barItem)
    }
  }

  const throttleProgressBar = throttle(() => {
    document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
  }, 250)

  useEffect(() => {
    const load = async () => {
      if (!pageNumber) {
        setPageNumber(1)
      }
      bookService.booksNew(pageNumber, 12, "Name", "fghdf").then((rs) => {
        console.log(rs.data)
        setMangaList(rs.data)
        setData(rs.data.data)
      }).catch(console.error)

      bookService.booksHotWeek(pageNumber, 12, "Name", "fghdf").then((rs) => {
        console.log(rs.data.data)
        setDataHot(rs.data.data)
        setIsLoading(false)
        window.addEventListener("resize", throttleProgressBar)
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
      })
    }

    setIsLoading(true)
    load().catch(console.error)
  }, [])

  const fetchData = () => {
    setPageNumber(pageNumber + 1)
    console.log("Load more", pageNumber + 1)
    bookService.booksNew(pageNumber + 1, 12, "Name", "fghdf").then((rs) => {
      console.log("data new", rs.data.data);
      setData(old => old.concat(rs.data.data))
    }).catch(console.error)
  }

  function onHandleClickLeft() {
    const progressBar = document.querySelector(".progress-bar")
    const slider = document.querySelector(".slider")
    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = progressBar.children.length

    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[progressBarItemCount - 1].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex - 1].classList.add("active")
    }
  }

  function onHandleClickRight() {
    const progressBar = document.querySelector(".progress-bar")
    const slider = document.querySelector(".slider")
    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = progressBar.children.length

    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[0].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex + 1].classList.add("active")
    }
  }

  return (
    <>
      <div className='container m-0 p-0' style={{ width: `100%`, border: `0px` }}>
        <div className='row no-gutter'>
          <div className='col-1'></div>
          <div className='col-10'>
            <div className='row no-gutter container-book' style={{ padding: "10px", margin: "20px 0", overflow: `hidden` }}>
              <div className='header-slider'>
                <h1 className='title' style={{ textAlign: 'left', fontSize: "20px", lineHeight: "24px" }}>TRUYỆN HOT TRONG TUẦN</h1>
                <div className='progress-bar'></div>
              </div>
              <div className='container-book-hot' style={{ padding: 0 }}>
                <button class="handle left-handle" style={{ padding: 0 }}
                  onClick={() => onHandleClickLeft()}
                >
                  <div class="text">&#8249;</div>
                </button>
                <div class="slider">
                  {
                    isLoading === false ? dataHot.map((item, index) => {
                      var stars = 0;
                      if (item.numOfReview !== 0) {
                        stars = item.numOfStar / item.numOfReview
                      }
                      return <div className='slider-item'>
                        <BookCard2 key={index} manga={{ index: item.lastestChapIndex, name: item.name, id: item.id, image: item.cover, star: stars, view: item.numOfView }} />
                      </div>
                    }) : <LinearProgress />
                  }
                </div>
                <button class="handle right-handle" style={{ padding: 0 }}
                  onClick={() => onHandleClickRight()}
                >
                  <div class="text">&#8250;</div>
                </button>
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div>

        <div className='row no-gutter'>
          <div className='col-1'></div>
          <div className='col-10' style={{ marginRight: 0 }}>
            <div className='row no-gutter d-flex flex-row'>
              <h1 className='title' style={{ textAlign: 'left' }}>TRUYỆN MỚI CẬP NHẬT</h1>
            </div>
            <div>
              <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={fetchData}
                hasMore={data.length !== mangaList.total}
                loader={<LinearProgress />}
              >
                <Grid container spacing={2}>
                  {
                    data.map((item, index) => {
                      var stars = 0;
                      if (item.numOfReview !== 0) {
                        stars = item.numOfStar / item.numOfReview
                      }
                      return <Grid item xs={6} sm={4} md={2}>
                        <BookCard2 key={index} manga={{ index: item.lastestChapIndex, name: item.name, id: item.id, image: item.cover, star: stars, view: item.numOfView }} />
                      </Grid>
                    })
                  }
                </Grid>
              </InfiniteScroll>
            </div>
          </div>
          <div className='col-1'></div>
        </div>
      </div >
    </>

  )
}

export default Home
