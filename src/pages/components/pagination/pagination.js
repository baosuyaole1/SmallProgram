
Component({
    properties: {
      page: {//值必须是奇数
        type: String||Number,
        value: 7
      },
      total:{
        type: String||Number,
        value: 10
      }
    },
    data: {
        currentPage:1,
        list:[]
    },
    methods: {
     //计算页码，当count等变化时自动计算
     pagers (){
        let me=this;
        const array = [];
        const perPages = me.data.page;
        const pageCount = me.data.total;
        let current = me.data.currentPage;
        const _offset = (perPages - 1) / 2;
        const offset = {
            start : current - _offset,
            end   : current + _offset
        }
        //-1, 3
        if (offset.start < 1) {
            offset.end = offset.end + (1 - offset.start)
            offset.start = 1
        }
        if (offset.end > pageCount) {
            offset.start = offset.start - (offset.end - pageCount)
            offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1
        

        for (let i = offset.start; i <= offset.end; i++) {
            array.push(i)
        }
        me.setData({
            showPrevMore : (offset.start > 1),
            showNextMore : (offset.end < pageCount),
            list:array
        })
        return array
    },
    change(e){
      let me=this;
      let ind=e.target.dataset.ind||e.currentTarget.dataset.ind;
      me.setCurrentpage(ind)
    },
    first(){
      let me=this;
      me.setCurrentpage(1)
    },
    last(){
      let me=this;
      me.setCurrentpage(me.data.total*1)
    },
    prev(){
      let me=this;
      me.setCurrentpage(me.data.currentPage-1)

    },
    setCurrentpage(num){
      let me=this;
      me.setData({
        currentPage:num
      })
      me.triggerEvent("change",num)
    },
    next(){
      let me=this;
      me.setCurrentpage(me.data.currentPage+1)
    }
    },
    observers:{
      'currentPage':function(){
        let me=this;
        me.pagers();
      }
    },
    attached() {
      let me=this;
      me.pagers()
    }
      
  })