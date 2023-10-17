// Model manggil pool
// Model isinya untuk logic query
const pool = require("../config/config");

class Movies {
  // perlu static, // perlu async await agar lebih simple
  static getMovies = async (next) => {
    const findQuery = `SELECT * FROM movies`;

    try {
      // perlu await agar lebih simple
      const data = await pool.query(findQuery);

      return data.rows;
    } catch (err) {
      next(err);
    }
  };

  static getMoviesById = async (id, next) => {
    const query = `SELECT * FROM movies WHERE id = $1;`;

    try {
      const data = await pool.query(query, [id]);

      if (data.rows.length === 0) {
        return null;
      }

      return data.rows[0];
    } catch (err) {
      next(err);
    }
  };

  static createMovies = async (moviesData, next) => {
    const { title, genre } = moviesData;

    if (!title || !genre) {
      return next({
        title: "paramsError",
      });
    }

    const query = `INSERT INTO movies (title, genre) VALUES ($1, $2);`;

    try {
      const data = await pool.query(query, [title, genre]);

      return data.rows[0];
    } catch {
      next(err);
    }
  };

  static update = async (id, moviesData, next) => {
    const { title, genre } = moviesData;

    if (!title || !genre) {
      return next({
        title: "paramsError",
      });
    }

    const query = `
      UPDATE movies 
      SET title = $1, 
      genre = $2 
      WHERE id = $3;
    `;
    try {
      const data = await pool.query(query, [title, genre, id]);
      return data.rows[0];
    } catch (err) {
      next(err);
    }
  };

  static delete = async (id, next) => {
    const query = `DELETE FROM movies WHERE id = $1;`;

    try {
      const data = await pool.query(query, [id]);
      return data.rows[0];
    } catch (err) {
      next(err);
    }
  };
}

module.exports = Movies;
