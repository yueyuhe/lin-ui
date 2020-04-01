// components/progress/index.js
import {
  px2rpx
} from '../utils/util.js'
import validator from '../behaviors/validator';
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['l-class', 'l-text-class', 'l-slot-class'],
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
      value: 0,
    },
    activeColor: {
      type: String,
    },
    backgroundColor: {
      type: String,
      value: '#EBEBEB',
    },
    showInfo: {
      type: Boolean,
      value: false
    },
    textPosition: {
      type: String,
      value: 'right',
      options: ['left', 'right']
    },
    slotWidth: {
      type: Number,
      value: 0
    },
    slotHeight: {
      type: Number,
      value: 0
    },
    textColor: {
      type: String,
      value: '#000000'
    }
  },

  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    slot_width: null,
    slot_height: null,
    progress_width: null,
    progress_height: null,
    margin_bottom: 0,
    margin_left: 0,
  },

  observers: {
    'slot_width, slot_height, progress_width, progress_height, percent': function (slot_width, slot_height, progress_width, progress_height, percent) {
      let margin_top = -(slot_height - progress_height) / 2
      let margin_left = (progress_width - slot_width) * percent / 100
      this.setData({
        margin_top,
        margin_left
      })
    }
  },

  lifetimes: {
    attached() {
      let that = this
      const query_slot = wx.createSelectorQuery().in(this)
      query_slot.select('.slot').boundingClientRect(function (res) {
        that.setData({
          slot_width: px2rpx(res.width),
          slot_height: px2rpx(res.height)
        })
      }).exec()
      const query_progress = wx.createSelectorQuery().in(this)
      query_progress.select('.progress').boundingClientRect(function (res) {
        that.setData({
          progress_height: px2rpx(res.height),
          progress_width: px2rpx(res.width)
        })
      }).exec()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})