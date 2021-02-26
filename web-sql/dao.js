var TodoDao = function () {
    var name = 'localdb'
    var version = '1.0'
    var description = 'ToDo Database'
    var size = 5 * 1024 * 1024
    var db = openDatabase(name, version, description, size)

    // テーブル作成
    db.transaction(function (tx) {
        tx.executeSql(`
        create table if not exists todo_table (
          id integer primary key autoincrement,
          todo varchar
        )
      `)
    })

    // 検索
    this.findAll = function (callback) {
        db.transaction(function (tx) {
            tx.executeSql('select * from todo_table', [],
                function (tx, results) {
                    var list = []
                    for (i = 0; i < results.rows.length; i++) {
                        list.push({
                            id: results.rows.item(i).id,
                            todo: results.rows.item(i).todo
                        })
                    }
                    callback(list)
                })
        })
    }

    // 登録
    this.insert = function (todo, callback) {
        db.transaction(function (tx) {
            tx.executeSql('insert into todo_table (todo) values (?)', [todo], callback)
        })
    }

    // 更新
    this.update = function (id, todo, callback) {
        db.transaction(function (tx) {
            tx.executeSql('update todo_table set todo = ? where id = ?', [todo, id], callback)
        })
    }

    // 削除
    this.remove = function (id, callback) {
        db.transaction(function (tx) {
            tx.executeSql('delete from todo_table where id = ?', [id], callback)
        })
    }

}