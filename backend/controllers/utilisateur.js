const db = require("../db/db");
exports.create = async(req,res) =>{
  const {nom, prenom, telephone, email, password, roles} = req.body;
  const sql  = "INSERT INTO acc.utilisateur (nom, prenom, telephone, email, password, roles) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *";
   db.query(sql, [nom, prenom,telephone, email, password, roles],(err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(result.rows[0]);
   })
}
exports.list = async(req,res) => {
    const sql = "SELECT * FROM acc.utilisateur";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result.rows);
    });
}

exports.show = async(req, res) =>  {
    const {id} = req.params;
    const { nom, prenom, telephone, email, password, roles} = req.body;
    const sql = "UPDATE acc.utilisateur SET nom = $1, prenom = $2, telephone = $3, email = $4, password = $5, roles = $6 WHERE id = $7 RETURNING *";

    db.query(sql,[nom, prenom, telephone, email, password, roles, id],(err, result) =>{
        if (err) return res.status(500).json(err);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "compte non trouvé"});
        }
        return res.status(200).json(result.rows[0]);
    });
}
exports.update = async(req, res) =>{
    const { id} = req.params;
    const { nom, prenom, telephone, email, password, roles} = req.body;
    const sql ="UPDATE acc.utilisateur SET nom = $1, prenom = $2, telephone = $3, email = $4, password = $5, roles = $6 WHERE id = $7 RETURNING *";

    db.query(sql,[nom, prenom, telephone, email, password, roles, id],(err, result) =>{
        if (err) return res.status(500).json(err);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "compte non trouvé"});
        }
        return res.status(200).json(result.rows[0]);
    });
}
exports.delete = async(req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM acc.utilisateur WHERE id = $1 RETURNING *";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }
        return res.status(200).json({ message: "Compte supprimé avec succès", deletedutilisateur: result.rows[0] });
    });
}
