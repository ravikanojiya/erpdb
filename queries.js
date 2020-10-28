const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "erpdb",
  password: "root",
  port: 5432,
});

const addpos = (req, res) => {
  const {
    poscode,
    posname,
    posshort,
    poslevel,
    description,
    status,
  } = req.body;
  pool.query(
    "insert into positions(poscode,posname,posshort,poslevel,description,status) values($1,$2,$3,$4,$5,$6)",
    [poscode, posname, posshort, poslevel, description, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Postion added ...`);
    }
  );
};
const getpos = (req, res) => {
  pool.query("select * from positions order by posid asc", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getposbyid = (req, res) => {
  const posid = parseInt(req.params.id);
  pool.query(
    "select * from positions where posid=$1",
    [posid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const updatepos = (req, res) => {
  const posid = parseInt(req.body.posid);
  const {
    poscode,
    posname,
    posshort,
    poslevel,
    description,
    status,
  } = req.body;
  pool.query(
    "update positions set poscode=$1,posname=$2, posshort=$3, poslevel=$4, description=$5, status=$6 where posid=$7",
    [poscode, posname, posshort, poslevel, description, status, posid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Position Updated....");
    }
  );
};
const deletepos = (req, res) => {
  const posid = parseInt(req.params.id);
  pool.query(
    "delete from positions where posid=$1",
    [posid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Position Deleted....");
    }
  );
};

const adddept = (req, res) => {
  const {
    deptcode,
    deptname,
    deptshort,
    deptlevel,
    positiondesc,
    status,
  } = req.body;
  pool.query(
    "insert into departments(deptcode, deptname,deptshort, deptlevel, positiondesc, status ) values($1,$2,$3,$4,$5,$6)",
    [deptcode, deptname, deptshort, deptlevel, positiondesc, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Department added ...`);
    }
  );
};
const getdept = (req, res) => {
  pool.query("select * from departments order by did asc", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getdeptbyid = (req, res) => {
  const did = parseInt(req.params.id);
  pool.query(
    "select * from departments where did=$1",
    [did],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const updatedept = (req, res) => {
  const did = parseInt(req.body.did);
  const {
    deptcode,
    deptname,
    deptshort,
    deptlevel,
    positiondesc,
    status,
  } = req.body;
  pool.query(
    "update departments  set deptcode=$1,deptname=$2, deptshort=$3, deptlevel=$4, positiondesc=$5, status=$6 where did=$7",
    [deptcode, deptname, deptshort, deptlevel, positiondesc, status, did],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Department Updated....");
    }
  );
};
const deletedept = (req, res) => {
  const did = parseInt(req.params.id);
  pool.query("delete from departments where did=$1", [did], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send("Dept Deleted....");
  });
};

const addemp = (req, res) => {
  const {
    empcode,
    ename,
    did,
    posid,
    doj,
    contact,
    email,
    status,
    enddate,
    image,
  } = req.body;
  pool.query(
    "insert into employees(empcode,ename,did,posid,doj,contact,email,status,enddate,image) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      empcode,
      ename,
      did,
      posid,
      doj,
      contact,
      email,
      status,
      enddate,
      image[0],
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Employee added ...`);
    }
  );
};
const getemp = (req, res) => {
  pool.query(
    "select * from employees join departments using(did)join positions using(posid) order by empid asc",
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

const upload = (req, res) => {
  if (!req.file) {
    console.log("No file Recived");
    return res.send({
      success: false,
    });
  } else {
    return res.send({
      success: true,
      name: req.file.filename,
    });
  }
};
const getempbyid = (req, res) => {
  const empid = parseInt(req.params.id);
  pool.query(
    "select * from employees where empid=$1",
    [empid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const updateemp = (req, res) => {
  const empid = parseInt(req.body.empid);
  const {
    empcode,
    ename,
    did,
    posid,
    doj,
    contact,
    email,
    status,
    enddate,
    image,
  } = req.body;
  pool.query(
    "update employees set empcode=$1,ename=$2, did=$3, posid=$4, doj=$5, contact=$6,email=$7,status=$8,enddate=$9,image=$10 where empid=$11",
    [
      empcode,
      ename,
      did,
      posid,
      doj,
      contact,
      email,
      status,
      enddate,
      image[0],
      empid,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Department Updated....");
    }
  );
};
const deleteemp = (req, res) => {
  const empid = parseInt(req.params.id);
  pool.query(
    "delete from employees where empid=$1",
    [empid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Emp Deleted....");
    }
  );
};

const addstudent = (req, res) => {
  const {
    scode,
    fn,
    mn,
    ln,
    gender,
    dob,
    doj,
    qualification,
    collegename,
    ref,
    mobile,
    email,
    inqdetail,
    status,
    address,
    studenttype,
    regi_date,
    image,
  } = req.body;
  pool.query(
    "insert into students(scode,fn,mn,ln,gender,dob,doj,qualification ,collegename,ref,mobile, email,inqdetail, status,address,studenttype,regi_date,image ) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18   )",
    [
      scode,
      fn,
      mn,
      ln,
      gender,
      dob,
      doj,
      qualification,
      collegename,
      ref,
      mobile,
      email,
      inqdetail,
      status,
      address,
      studenttype,
      regi_date,
      image[0],
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`student added ...`);
    }
  );
};
const getstudent = (req, res) => {
  pool.query("select * from students order by sid asc", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getcstudent = (req, res) => {
  const studenttype = "club";
  pool.query(
    "select * from students where studenttype=$1 order by sid asc",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getbstudent = (req, res) => {
  const studenttype = "gen";
  pool.query(
    "select * from students where studenttype=$1 order by sid asc",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getostudent = (req, res) => {
  const studenttype = "oto";
  pool.query(
    "select * from students where studenttype=$1 order by sid asc",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const uploadstudent = (req, res) => {
  if (!req.file) {
    console.log("No file Recived");
    return res.send({
      success: false,
    });
  } else {
    return res.send({
      success: true,
      name: req.file.filename,
    });
  }
};
const getstudentbyid = (req, res) => {
  const sid = parseInt(req.params.id);
  pool.query("select * from students where sid=$1", [sid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getstudentbybatchid = (req, res) => {
  const batchid = parseInt(req.params.id);
  pool.query(
    "select * from students where sid=$1",
    [batchid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const updatestudent = (req, res) => {
  const sid = parseInt(req.body.sid);
  const {
    scode,
    fn,
    mn,
    ln,
    gender,
    dob,
    doj,
    qualification,
    collegename,
    ref,
    mobile,
    email,
    inqdetail,
    status,
    address,
    studenttype,
    regi_date,
    image,
  } = req.body;
  pool.query(
    "update students set scode=$1, fn=$2, mn=$3, ln=$4, gender=$5, dob=$6, doj=$7, qualification=$8, collegename=$9, ref=$10, mobile=$11, email=$12, inqdetail=$13, status=$14, address=$15, studenttype=$16, regi_date=$17, image=$18 where sid=$19",
    [
      scode,
      fn,
      mn,
      ln,
      gender,
      dob,
      doj,
      qualification,
      collegename,
      ref,
      mobile,
      email,
      inqdetail,
      status,
      address,
      studenttype,
      regi_date,
      image[0],
      sid,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Updated");
    }
  );
};
const deletestudent = (req, res) => {
  const sid = parseInt(req.params.id);
  pool.query("delete from students where sid=$1", [sid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send("Student deleted...");
  });
};

const adduser = (req, res) => {
  const { empid, username, password, role, editiong, status, did } = req.body;
  pool.query(
    "insert into users(empid,username,password,role,editiong,status,did)values($1,$2,$3,$4,$5,$6,$7)",
    [empid, username, password, role, editiong, status, did],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("User added");
    }
  );
};
const getalluser = (req, res) => {
  pool.query("select * from users order by uid asc", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getuserbyid = (req, res) => {
  const uid = parseInt(req.params.id);
  // console.log(uid);
  pool.query("select * from users where uid=$1", [uid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
    // console.log(result.rows);
  });
};
const updateuser = (req, res) => {
  const uid = parseInt(req.body.uid);
  const { empid, username, password, role, editiong, status } = req.body;
  pool.query(
    "update users set empid=$1,username=$2,password=$3,role=$4,editiong=$5,status=$6 where uid=$7",
    [empid, username, password, role, editiong, status, uid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("User Updated..");
    }
  );
};
const deleteuser = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query("delete from users where uid=$1", [uid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send("User Deleted..");
  });
};
const getempdetail = (req, res) => {
  pool.query(
    "select * from users join employees using(empid)",
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getlogin = (req, res) => {
  const { username, password } = req.body;
  pool.query(
    "select * from users where username=$1 and password=$2",
    [username, password],
    (error, result) => {
      if (error) {
        throw error;
      }
      
      res.send({ status: 200, msg: "success", data: result.rows });
    }
  );
};
const addcourse = (req, res) => {
  const { cname, ccode, status } = req.body;
  pool.query(
    "insert into courses(cname,ccode,status) values($1,$2,$3)",
    [cname, ccode, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Course added...");
    }
  );
};
const getcourses = (req, res) => {
  pool.query("select * from courses order by cid asc", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getcoursebyid = (req, res) => {
  const cid = parseInt(req.params.id);
  pool.query("select * from courses where cid=$1", [cid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const updatecourse = (req, res) => {
  const cid = parseInt(req.body.cid);
  const { cname, ccode, status } = req.body;
  pool.query(
    "update courses set cname=$1,ccode=$2,status=$3 where cid=$4",
    [cname, ccode, status, cid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("course updated...");
    }
  );
};
const deletecourse = (req, res) => {
  const cid = parseInt(req.params.id);
  pool.query("delete from courses where cid=$1", [cid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send("Courses deleted....");
  });
};

const addbatch = (req, res) => {
  const {
    bcode,
    batchname,
    batchtype,
    cid,
    startdate,
    enddate,
    starttime,
    endtime,
    status,
    created_at,
    uid,
    grplink,
  } = req.body;
  pool.query(
    "insert into batches( bcode,batchname,batchtype,cid,startdate,enddate,starttime,endtime,status,created_at,uid,grplink) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
      bcode,
      batchname,
      batchtype,
      cid,
      startdate,
      enddate,
      starttime,
      endtime,
      status,
      created_at,
      uid,
      grplink,
    ],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send("batch Added");
      }
    }
  );
};
const getbatches = (req, res) => {
  pool.query("select * from batches order by batchid asc", (error, result) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(result.rows);
    }
  });
};
const getbatchbyid = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query("select * from batches where uid=$1", [uid], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(result.rows);
    }
  });
};
const updatebatch = (req, res) => {
  const batchid = parseInt(req.body.batchid);
  const {
    bcode,
    batchname,
    batchtype,
    cid,
    startdate,
    enddate,
    starttime,
    endtime,
    status,
  } = req.body;
  pool.query(
    "update batches set bcode=$1,batchname=$2,batchtype=$3,cid=$4,startdate=$5,enddate=$6,starttime=$7,endtime=$8,status=$9 where batchid=$10",
    [
      bcode,
      batchname,
      batchtype,
      cid,
      startdate,
      enddate,
      starttime,
      endtime,
      status,
      batchid,
    ],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send("Batche updated...");
      }
    }
  );
};
const deletebatch = (req, res) => {
  const batchid = parseInt(req.params.id);
  pool.query(
    "delete from batches where batchid=$1",
    [batchid],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send("Batchedeleted...");
      }
    }
  );
};

const getbatchdetail = (req, res) => {
  pool.query(
    "select  batchname bn,username en,batchtype bt,startdate st,batchid,batchtype bty from batches join users on(batches.uid=users.uid)",
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

const mbatchadd = (req, res) => {
  const { batchid, sid, status, add_date } = req.body;
  pool.query(
    "insert into batchstudent(batchid,sid,status,add_date) values($1,$2,$3,$4)",
    [batchid, sid, status, add_date],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("added studentbatch");
    }
  );
};
const getmbatch = (req, res) => {
  pool.query(
    "select batchstudent.bsid,batchname bn,batchtype bt,fn,mn,ln,add_date ad,batchstudent.status st,username un from batchstudent join batches using(batchid) join users using(uid) join students using(sid) order by bsid asc",
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getmbatchbyid = (req, res) => {
  const bsid = parseInt(req.params.id);
  pool.query(
    "select * from batchstudent where bsid=$1",
    [bsid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const updatembatch = (req, res) => {
  const bsid = parseInt(req.body.bsid);
  const { batchid, sid, status, add_date } = req.body;
  pool.query(
    "update batchstudent set batchid=$1,sid=$2,status=$3,add_date=$4 where bsid=$5",
    [batchid, sid, status, add_date, bsid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Mbatch Updated...");
    }
  );
};
const deletembatch = (req, res) => {
  const bsid = parseInt(req.params.id);
  pool.query(
    "delete from batchstudent where bsid=$1",
    [bsid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Deleted mbatch");
    }
  );
};
const deletems = (req, res) => {
  const sid = parseInt(req.params.id);
  pool.query(
    "delete from batchstudent where sid=$1",
    [sid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Deleted mbatch");
    }
  );
};
// const countstud = (req, res) => {
//     const uid = parseInt(req.params.id);
//     pool.query("select batchname bn from batchestudent join batches using(batchid)", [uid], (error, result) => {
//         if (error) { throw error } else { res.status(200).json(result.rows); }
//     });
// }
const getfacstudent = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query(
    "select * from batchstudent join batches using(batchid) join students using(sid) where batches.uid=$1",
    [uid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getbatchstudent = (req, res) => {
  const batchid = parseInt(req.params.id);
  pool.query(
    "select * from users join batches using(uid) join batchstudent using(batchid) join students using(sid) where batchid=$1",
    [batchid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getemailstudent = (req, res) => {
  const bsid = parseInt(req.params.id);
  pool.query(
    "select * from users join batches using(uid) join batchstudent using(batchid) join students using(sid) where batchstudent.bsid=$1",
    [bsid],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result.rows);

      res.status(200).json(result.rows);
    }
  );
};
const getbatchstudentfac = (req, res) => {
  pool.query("select * from students", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const getclubbatch = (req, res) => {
  const batchtype = "club";
  pool.query(
    "select  batchname bn,username en,batchtype bt,startdate st,batchid from batches join users on(batches.uid=users.uid) where batches.batchtype=$1",
    [batchtype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getgenbatch = (req, res) => {
  const batchtype = "gen";
  pool.query(
    "select  batchname bn,username en,batchtype bt,startdate st,batchid from batches join users on(batches.uid=users.uid) where batches.batchtype=$1",
    [batchtype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getotobatch = (req, res) => {
  const batchtype = "oto";
  pool.query(
    "select  batchname bn,username en,batchtype bt,startdate st,batchid from batches join users on(batches.uid=users.uid) where batches.batchtype=$1",
    [batchtype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const getfacbatchbyid = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query("select * from batches where uid=$1", [uid], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const addsession = (req, res) => {
  const {
    uid,
    stime,
    etime,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
    status,
  } = req.body;
  pool.query(
    "insert into sessions(uid,stime,etime,mon,tue,wed,thu,fri,sat,sun,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [uid, stime, etime, mon, tue, wed, thu, fri, sat, sun, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Session added");
    }
  );
};
const getsessionsbyid = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query(
    "select s.stime,s.etime,b1.batchname mon,b2.batchname tue,b3.batchname wed,b4.batchname thu,b5.batchname fri,b6.batchname sat,b7.batchname sun,s.status from sessions s join batches b1 on (s.mon=b1.batchid) join batches b2 on(s.tue=b2.batchid) join batches b3 on(s.wed=b3.batchid) join batches b4 on(s.thu=b4.batchid) join batches b5 on(s.fri=b5.batchid) join batches b6 on(s.sat=b6.batchid) join batches b7 on(s.sun=b7.batchid) where s.uid=$1 order by s.sessid asc",
    [uid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const countclub = (req, res) => {
  const studenttype = "club";
  pool.query(
    "select studenttype,count(*) cc from students where studenttype=$1 group by studenttype",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const countgen = (req, res) => {
  const studenttype = "gen";
  pool.query(
    "select studenttype,count(*) cc from students where studenttype=$1 group by studenttype",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const countoto = (req, res) => {
  const studenttype = "oto";
  pool.query(
    "select studenttype,count(*) cc from students where studenttype=$1 group by studenttype",
    [studenttype],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const countallstd = (req, res) => {
  pool.query("select count(*) ca from students", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const countallemp = (req, res) => {
  pool.query("select count(*) ce from employees", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};
const clubcounttody = (req, res) => {
  const d = new Date();
  const c = "club";
  pool.query(
    "select count(*) tc from students where studenttype=$1 and regi_date=$2",
    [c, d],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
const contfacbatch = (req, res) => {
  const uid = parseInt(req.params.id);
  pool.query(
    "select count(*) fbc from batches where uid=$1",
    [uid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};
module.exports = {
  addpos,
  getpos,
  getposbyid,
  updatepos,
  deletepos,
  adddept,
  getdept,
  getdeptbyid,
  updatedept,
  deletedept,
  getempdetail,
  upload,
  addemp,
  getemp,
  getempbyid,
  updateemp,
  deleteemp,
  adduser,
  getalluser,
  getuserbyid,
  updateuser,
  deleteuser,
  getlogin,
  addcourse,
  getcourses,
  getcoursebyid,
  updatecourse,
  deletecourse,
  addbatch,
  getbatches,
  getbatchbyid,
  updatebatch,
  deletebatch,
  getbatchdetail,
  addstudent,
  uploadstudent,
  getstudent,
  getstudentbyid,
  updatestudent,
  deletestudent,
  mbatchadd,
  getmbatch,
  getmbatchbyid,
  updatembatch,
  deletembatch,
  getfacstudent,
  getbatchstudent,
  deletems,
  getclubbatch,
  getgenbatch,
  getotobatch,
  getcstudent,
  getbstudent,
  getostudent,
  getfacbatchbyid,
  addsession,
  getsessionsbyid,
  countclub,
  countgen,
  countoto,
  countallstd,
  countallemp,
  clubcounttody,
  contfacbatch,
  getbatchstudentfac,
  getemailstudent,
};
