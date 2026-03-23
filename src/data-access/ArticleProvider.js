import database from '../infrastructure/db.js';

class ArticleProvider {
  static async addEntry(entryData) {
    const { headline, body, contributor, publishDate, topic, tags } = entryData;
    const tagList = Array.isArray(tags) ? tags.join(',') : tags;

    const sql = `
      INSERT INTO blog_entries (headline, body, contributor, publishDate, topic, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      database.run(sql, [headline, body, contributor, publishDate, topic, tagList], function(error) {
        if (error) {
          reject(error);
        } else {
          resolve({ id: this.lastID, ...entryData });
        }
      });
    });
  }

  static async fetchAll(filters = {}) {
    let sql = 'SELECT * FROM blog_entries WHERE 1=1';
    const values = [];

    if (filters.topic) {
      sql += ' AND topic = ?';
      values.push(filters.topic);
    }

    if (filters.contributor) {
      sql += ' AND contributor = ?';
      values.push(filters.contributor);
    }

    if (filters.publishDate) {
      sql += ' AND publishDate = ?';
      values.push(filters.publishDate);
    }

    sql += ' ORDER BY created_at DESC';

    return new Promise((resolve, reject) => {
      database.all(sql, values, (error, lines) => {
        if (error) {
          reject(error);
        } else {
          const results = lines.map(line => ({
            ...line,
            tags: line.tags ? line.tags.split(',') : []
          }));
          resolve(results);
        }
      });
    });
  }

  static async findByPk(id) {
    const sql = 'SELECT * FROM blog_entries WHERE id = ?';

    return new Promise((resolve, reject) => {
      database.get(sql, [id], (error, line) => {
        if (error) {
          reject(error);
        } else if (!line) {
          resolve(null);
        } else {
          resolve({
            ...line,
            tags: line.tags ? line.tags.split(',') : []
          });
        }
      });
    });
  }

  static async modify(id, entryData) {
    const { headline, body, contributor, publishDate, topic, tags } = entryData;
    const tagList = Array.isArray(tags) ? tags.join(',') : tags;

    const sql = `
      UPDATE blog_entries
      SET headline = ?, body = ?, contributor = ?, publishDate = ?, topic = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
      database.run(sql, [headline, body, contributor, publishDate, topic, tagList, id], function(error) {
        if (error) {
          reject(error);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          ArticleProvider.findByPk(id).then(resolve).catch(reject);
        }
      });
    });
  }

  static async remove(id) {
    const sql = 'DELETE FROM blog_entries WHERE id = ?';

    return new Promise((resolve, reject) => {
      database.run(sql, [id], function(error) {
        if (error) {
          reject(error);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          resolve({ deleted: true, id });
        }
      });
    });
  }

  static async lookup(searchQuery) {
    const sql = `
      SELECT * FROM blog_entries
      WHERE headline LIKE ? OR body LIKE ?
      ORDER BY created_at DESC
    `;
    const pattern = `%${searchQuery}%`;

    return new Promise((resolve, reject) => {
      database.all(sql, [pattern, pattern], (error, lines) => {
        if (error) {
          reject(error);
        } else {
          const results = lines.map(line => ({
            ...line,
            tags: line.tags ? line.tags.split(',') : []
          }));
          resolve(results);
        }
      });
    });
  }
}

export default ArticleProvider;
