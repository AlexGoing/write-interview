window.onload = function () {
  const slideBox = new SlideBox();
  slideBox.init();
};

// 轮播图类
function SlideBox() {
  const _slideBtnLeft = document.querySelector(".slide-btn-left");
  const _slideBtnRight = document.querySelector(".slide-btn-right");
  const _banner = document.querySelector(".banner");
  const _paginationBox = document.querySelector(".pagination-box");

  // 页标节点数组
  const _sheetDoms = [];

  // 轮播图数据对象
  const _slideObj = {
    bannerImgs: [
      // 图片对象数组
      {
        img: "banner01.jpg",
        title: "This is the first",
      },
      {
        img: "banner02.jpg",
        title: "This is the second",
      },
      {
        img: "banner03.jpg",
        title: "This is the third",
      },
      // 可以继续增加图片
      {
        img: "banner04.jpg",
        title: "This is the fourth",
      },
      {
        img: "banner05.jpg",
        title: "This is the fifth",
      },
    ],
    _pageIndex: null, //记数器
    get pageIndex() {
      return this._pageIndex;
    },
    set pageIndex(value) {
      if (value < -1 || value > this.bannerImgs.length) {
        console.warn("pageIndex 的数值过大或过小");
      }

      const oldIndex = this._pageIndex ?? value;
      let newIndex = value;

      if (value === -1) {
        newIndex = this.bannerImgs.length - 1;
        _changePage(this.bannerImgs.length, false);
      } else if (value === this.bannerImgs.length) {
        newIndex = 0;
        _changePage(-1, false);
      }

      _throttle(() => {
        this._pageIndex = newIndex;
        _changePagination(this._pageIndex, oldIndex);
        _changePage(this._pageIndex, true);
      }, 0)();
    },
  };

  // 定时轮播器
  let _boonTimer = null;
  let _boonTimerNum = 3000;

  // 更改定时器
  const changeBoonTimer = (isOpen) => {
    clearInterval(_boonTimer);
    if (isOpen) {
      // _boonTimer = setInterval(_boonTimerCB, _boonTimerNum);
    }
  };

  function _boonTimerCB() {
    _slideObj.pageIndex++;
  }

  // 初始化
  this.init = () => {
    _createUI();
    _slideObj.pageIndex = 0;

    // 启动轮播
    changeBoonTimer(true);

    // 监听事件
    _slideBtnLeft.addEventListener("click", () => {
      _slideObj.pageIndex -= 1;
    });
    _slideBtnRight.addEventListener("click", () => {
      _slideObj.pageIndex += 1;
    });

    // 清空轮播
    _slideBtnLeft.addEventListener("mouseover", () => {
      changeBoonTimer(false);
    });
    _slideBtnRight.addEventListener("mouseover", () => {
      changeBoonTimer(false);
    });
    _paginationBox.addEventListener("mouseover", () => {
      changeBoonTimer(false);
    });

    // 启动轮播
    _slideBtnLeft.addEventListener("mouseout", () => {
      changeBoonTimer(true);
    });
    _slideBtnRight.addEventListener("mouseout", () => {
      changeBoonTimer(true);
    });
    _paginationBox.addEventListener("mouseout", () => {
      changeBoonTimer(true);
    });
  };

  // 节流器
  function _throttle(fn, wait) {
    let timer = null;
    return function () {
      let context = this;
      let args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          fn.apply(context, args);
          timer = null;
        }, wait);
      }
    };
  }

  // 改变当前页
  function _changePage(index, isAnim) {
    _banner.style.transition = !!isAnim ? "left 1s" : "none";
    _banner.style.left = `${-index * 100}%`;
  }

  // 改变分页标识
  function _changePagination(index, oldIndex) {
    _sheetDoms[oldIndex].classList.remove("chose");
    _sheetDoms[index].classList.add("chose");
  }

  // 得到模板字符串
  function _getBannerHTML(index) {
    return `
            <div class="banner-item"
            style="background-image: url(./images/${_slideObj.bannerImgs[index].img});">
            <div class="bi-content">
                <h1>
                    <span>${_slideObj.bannerImgs[index].title}</span>
                </h1>
                <button><span>了解详情</span></button>
            </div>
        </div>
        `;
  }

  // 创建 UI
  function _createUI() {
    for (let i = 0, len = _slideObj.bannerImgs.length; i < len; i++) {
      switch (i) {
        case 0:
          _banner.innerHTML += _getBannerHTML(len - 1) + _getBannerHTML(i);
          break;
        case len - 1:
          _banner.innerHTML += _getBannerHTML(i) + _getBannerHTML(0);
          break;
        default:
          _banner.innerHTML += _getBannerHTML(i);
      }

      const span = document.createElement("span");
      _paginationBox.appendChild(span);
      _sheetDoms.push(span);
      span.style.transition = "all 1s";

      // 监听事件
      span.addEventListener("click", () => {
        _slideObj.pageIndex = i;
      });
    }

    _banner.style.marginLeft = "-100%";
    _banner.style.left = "0";
  }
}
