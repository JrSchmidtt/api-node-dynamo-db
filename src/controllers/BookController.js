import bookService from "../service/bookService";

class BookController {
    async index(req, res) {
        const books = await bookService.getBooks();
        if (books.error) {
            return res.status(500).json(books);
        }
        res.status(200).json(books);
    }
    async create(req, res) {
        if (!req.body.title) {
            res.status(400).json({ error: 'Title is required' });
        }
        const book = await bookService.createBook(req.body);
        if (book.error) {
            return res.status(500).json(book);
        }
        res.status(201).json(book);
    }
    async show(req, res) {
        const book = await bookService.getBook(req.params.id);
        if (book === undefined) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    }
    async delete(req, res) {
        const book = await bookService.deleteBook(req.params.id);
        res.status(204).json(book);
    }
}

export default new BookController();