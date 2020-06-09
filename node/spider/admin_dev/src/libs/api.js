export default {
  getUser: "/v1/users",
  login: "/v1/login",
  editPassword: "/v1/users/editPassword",
  checkLock: "/v1/users/checkLock",

  permission: {
    list: "/v1/permission/list",
    roleList: "/v1/permission/roleList",
    delRole: "/v1/permission/delRole",
    addRole: "/v1/permission/addRole",
    editRole: "/v1/permission/editRole",
    staffList: "/v1/permission/staffList",
    addStaff: "/v1/permission/addStaff",
    editStaff: "/v1/permission/editStaff",
    delStaff: "/v1/permission/delStaff"
  },
  books: {
    book: "/v1/book",
    catalogList: "/v1/book/catalogList",
    catalog: "/v1/book/catalog",
    saveCatalog: "/v1/book/saveCatalog",
    updateCatalog: "/v1/book/updateCatalog",
    updateCatalogIsJin: "/v1/book/updateCatalogIsJin",
    updateBookIsJin: "/v1/book/updateBookIsJin",
    updateBookInfo: "/v1/book/updateBookInfo",
    updateBookDescription: "/v1/book/updateBookDescription",
    updateBookStatus: "/v1/book/updateBookStatus",
    updateNewCatalog: "/v1/book/updateNewCatalog",
    oneKeyUpdateNewCatalog: "/v1/book/oneKeyUpdateNewCatalog",
    delBook: "/v1/book/deleteBook",
    editBookInfo: "/v1/book/editBookInfo"
  },
  writer: {
    bookList: "/v1/writer/bookList",
    addBook: "/v1/writer/addBook",
    addCatalog: "/v1/writer/addCatalog",
    delCatalog: "/v1/writer/delCatalog",
    editBook: "/v1/writer/editBook"
  },
  reptile: {
    list: "/v1/reptile",
    getUrl: "/v1/reptile/getUrl",
    getBookJson: "/v1/reptile/getBookJson",
    startReptile: "/v1/reptile/startReptile",
    updateReptileList: "/v1/reptile/updateReptileList",
    getProgressList: "/v1/reptile/getProgressList",
    deleteError: "/v1/reptile/deleteError",
    restartCatalog: "/v1/reptile/restartCatalog",
    oneKeyRestartCatalog: "/v1/reptile/oneKeyRestartCatalog",
    addChannel: "/v1/reptile/addChannel",
    editChannel: "/v1/reptile/editChannel",
    updateChannelSearch: "/v1/reptile/updateChannelSearch",
    deleteChannel: "/v1/reptile/deleteChannel",
    exportChannel: "reptile/exportChannel",
    uploadChannel: "reptile/uploadChannel"
  },
  ip: {
    list: "/v1/ip",
    removeRepeat: "/v1/ip/removeRepeat",
    startReptile: "/v1/ip/startReptile",
    delete: "/v1/ip/delete",
    check: "/v1/ip/check",
    exportIp: "/v1/ip/exportIp"
  },
  type: {
    authorList: "/v1/type/authorList",
    bookTypeList: "/v1/type/bookTypeList",
    updateAuthorList: "/v1/type/updateAuthorList",
    updateBookTypeList: "/v1/type/updateBookTypeList"
  },
  log: {
    download: "/v1/log/download",
    clearAll: "/v1/log/clearAll", // 即将废弃
    list: "/v1/log/list",
    delete: "/v1/log/delete",
    splice: "/v1/log/splice"
  },
  common: {
    // 共用工具
    getCatalogFromInfo: "/v1/common/getCatalogFromInfo", // 获取章节列表 通过一些信息(比如书名和章节名)
    oneKeyGetAllBookImg: "/v1/common/oneKeyGetAllBookImg"
  }
};
