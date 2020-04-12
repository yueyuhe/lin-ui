// components/progress/index.js
import {
  px2rpx
} from "../utils/util.js"
import validator from "../behaviors/validator";
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["l-class", "l-text-class", "l-active-class", "l-background-class"],
  behaviors: [validator],
  properties: {
    percent: {
      type: Number,
      value: 0,
    },
    strokeWidth: {
      type: Number,
      value: 12
    },
    borderRadius: {
      type: Number,
      value: 6,
    },
    activeColor: {
      type: String,
    },
    backgroundColor: {
      type: String,
      value: "#EBEBEB",
    },
    showInfo: {
      type: Boolean,
      value: false
    },
    textPosition: {
      type: String,
      value: "right",
      options: ["left", "right", "inner"]
    },
    textColor: {
      type: String,
    },
    interval: {
      type: Number,
      value: 20,
    }
  },

  options: {
    multipleSlots: true,
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },

  /**
   * 组件的初始数据
   */
  data: {
    _slotWidth: 0,
    _slotHeight: 0,
    _progressWidth: 0,
    _progressHeight: 0,
    _marginBottom: 0,
    _marginLeft: 0,
    _marginTop: 0,
  },

  observers: {
    "_slotWidth, _slotHeight, _progressWidth, _progressHeight, percent": function (_slotWidth, _slotHeight, _progressWidth, _progressHeight, percent) {
      const _marginTop = -(_slotHeight - _progressHeight) / 2
      const _marginLeft = (_progressWidth - _slotWidth) * percent / 100
      this.setData({
        _marginTop,
        _marginLeft
      })
    }
  },

  lifetimes: {
    attached() {
      const querySlot = wx.createSelectorQuery().in(this)
      querySlot.select(".slot").boundingClientRect(res => {
        this.setData({
          _slotWidth: px2rpx(res.width),
          _slotHeight: px2rpx(res.height)
        })
      }).exec()
      const queryProgress = wx.createSelectorQuery().in(this)
      queryProgress.select(".progress").boundingClientRect(res => {
        this.setData({
          _progressHeight: px2rpx(res.height),
          _progressWidth: px2rpx(res.width)
        })
      }).exec()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})