import bookService from "../service/bookService";

class BookController {
    async index(req, res) {
        res.status(200).json([{ id: 1, name: 'book name' }]);
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
}

export default new BookController();