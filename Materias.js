function GetMaterias (name, database) {
  var materiaRef = database.collection('Materias');
  var allMaterias = [];
  materiaRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          allMaterias.push(doc.data());
          console.log(doc.id, '=>', doc.data()); // just for test
        });
      })
      .catch(err => {
        console.log('Error getting documents', err); // just for test
        return err;
      });

  return allMaterias;
}
