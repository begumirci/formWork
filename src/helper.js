function getAllRecords(){
  if(localStorage.data){
    return JSON.parse(localStorage.data);
  }
  return [];
}

function commitRecord(data){
  localStorage.data = JSON.stringify(data)
}

function myId(){
 return `${new Date().toLocaleTimeString().replaceAll(':', '')}-${crypto.randomUUID()}`
}

function InsertRecords({name, email,gender}){

  const records = getAllRecords();
  const [newRecord] = arguments;
  newRecord.id = myId();
  records.push(newRecord);
  commitRecord(records);
}

function UpdateRecords({name, id, email, gender}){
  const records = getAllRecords();
  const record = records.find(x => x.id == id);

  record.name = name;
  record.email = email;
  record.gender = gender;

  commitRecord(records);

}

function oneRecord(id){
  return  getAllRecords().find(x => x.id == id) ?? null;
}

export {getAllRecords, InsertRecords,oneRecord,UpdateRecords,commitRecord};