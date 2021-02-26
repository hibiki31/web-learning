var tododao = new TodoDao()

// 読み込み後に実行
$(document).ready(function () {
    // イベントハンドラ登録
    $('input[name=todo]').keyup(function (v) {
        $('button[name=submit], button[name=edit]')
            .prop('disabled', $(this).val() == 0)
    })
    // 各ボタンをクリックした際のイベントハンドラ登録
    $('button[name=submit]').on('click', register)
    $('#table tbody').on('click', 'tr td button[name=edit]', edit)
    $('#table tbody').on('click', 'tr td button[name=remove]', remove)
    // 初期化
    init()
})

// 初期化
var init = function () {
    // 表を初期化
    $('#table tbody').empty()
    // 表を描画
    tododao.findAll(function (list) {
        // デバッグ用に内容を表示
        console.log(list)
        $.each(list, function (i, e) {
            $('#table tbody').append(`
                <tr>
                <td>${i + 1}</td>
                <td>${e.todo}</td>
                <td><button type="button" name="edit" value="${e.id}">更新</button></td>
                <td><button type="button" name="remove" value="${e.id}">削除</button></td>
                </tr>
            `)
        })
        // inputを初期化
        $('input[name=todo]').val('').focus().keyup()
    })
}

// 登録
var register = function () {
    var todo = $('input[name=todo]').val()
    tododao.insert(todo, init)
}

// 更新
var edit = function () {
    var id = $(this).val()
    var todo = $('input[name=todo]').val()
    tododao.update(id, todo, init)
}

// 削除
var remove = function () {
    var id = $(this).val()
    tododao.remove(id, init)
}