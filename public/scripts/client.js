// doc ready function
$(function(){
  console.log('document loaded');

  getBooks();
});

function getBooks() {
  $.ajax({
    url: '/books',
    type: 'GET',
    success: displayBooks
  });
}

function displayBooks(books) {
  console.log('Got books from the server', books);

  books.forEach(function(book){
    var $li = $('<li></li>');

    $li.append('<p><strong>' + book.title + '</strong></p>');
    $li.append('<p><em>' + book.author + '</em></p>');

    var date = new Date(book.publication_date).toDateString();
    $li.append('<p><time>' + date + '</time></p>');

    $('#book-list').append($li);
  });
}
