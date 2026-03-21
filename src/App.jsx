import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// STAFF DATA — 52 Permanent Staff
// ═══════════════════════════════════════════════════════════════
const STAFF = [
  {empNo:"11004",  title:"Mr", initials:"L. A.",            lastName:"Kithsiri",       fullName:"L. A. Kithsiri",               dob:"1968-10-13", nic:"682870516V",   gender:"Male",   joined:"2025-02-18", section:"Academic",     designation:"Director",                  basicSalary:123659, staffGrade:"officer"},
  {empNo:"10541",  title:"Mr", initials:"B. P. T. S.",      lastName:"Aberathna",      fullName:"B. P. T. S. Aberathna",        dob:"1976-10-07", nic:"762812045V",   gender:"Male",   joined:"2010-02-05", section:"Academic",     designation:"Lecturer",                  basicSalary:89889,  staffGrade:"officer"},
  {empNo:"10543",  title:"Mr", initials:"K. A. S. A. G. N.",lastName:"Senadheera",     fullName:"K. A. S. A. G. N. Senadheera", dob:"1970-12-04", nic:"197033901532", gender:"Male",   joined:"2025-01-01", section:"Academic",     designation:"Instructor",                basicSalary:91363,  staffGrade:"officer"},
  {empNo:"11272",  title:"Ms", initials:"A. S. N.",          lastName:"Amarasekara",    fullName:"A. S. N. Amarasekara",         dob:"1980-03-16", nic:"805761105V",   gender:"Female", joined:"2016-01-01", section:"Academic",     designation:"Instructor",                basicSalary:87317,  staffGrade:"officer"},
  {empNo:"11469",  title:"Ms", initials:"H. K. A. P.",       lastName:"Wickramapala",   fullName:"H. K. A. P. Wickramapala",     dob:"1975-08-09", nic:"197572200849", gender:"Female", joined:"2025-01-01", section:"Academic",     designation:"Instructor",                basicSalary:79962,  staffGrade:"officer"},
  {empNo:"11248",  title:"Mr", initials:"S. P.",             lastName:"Tennakoon",      fullName:"S. P. Tennakoon",              dob:"1980-09-22", nic:"802665547V",   gender:"Male",   joined:"2024-02-01", section:"Academic",     designation:"Instructor",                basicSalary:0,      staffGrade:"officer"},
  {empNo:"11389",  title:"Ms", initials:"B. G. A. N.",       lastName:"Pushpakumari",   fullName:"B. G. A. Nayana Pushpakumari", dob:"1982-06-20", nic:"826721162V",   gender:"Female", joined:"2018-03-02", section:"Academic",     designation:"Instructor",                basicSalary:81616,  staffGrade:"officer"},
  {empNo:"11408",  title:"Mr", initials:"H. K. K.",          lastName:"Peiris",         fullName:"H. K. K. Peiris",              dob:"1977-03-28", nic:"770883849V",   gender:"Male",   joined:"2017-03-24", section:"Academic",     designation:"Instructor",                basicSalary:81616,  staffGrade:"officer"},
  {empNo:"11481",  title:"Mr", initials:"H. C.",             lastName:"Thilakasiri",    fullName:"H. C. Thilakasiri",            dob:"1980-09-10", nic:"802540060V",   gender:"Male",   joined:"2021-03-29", section:"Academic",     designation:"Instructor",                basicSalary:79962,  staffGrade:"officer"},
  {empNo:"11250",  title:"Ms", initials:"G. G. S.",          lastName:"Ariyarathna",    fullName:"G. G. S. Ariyarathna",         dob:"1976-10-31", nic:"768051445V",   gender:"Female", joined:"2025-01-30", section:"Academic",     designation:"Instructor",                basicSalary:84925,  staffGrade:"officer"},
  {empNo:"11809",  title:"Mr", initials:"B. D. T. G. D. K.",lastName:"Bopitiya",       fullName:"B. D. T. G. D. K. Bopitiya",  dob:"1969-03-02", nic:"690620596V",   gender:"Male",   joined:"1997-01-01", section:"Academic",     designation:"Demonstrator",              basicSalary:65023,  staffGrade:"officer"},
  {empNo:"220004", title:"Mr", initials:"K. V. M.",          lastName:"Wijesekara",     fullName:"K. V. M. Wijesekara",          dob:"1996-03-19", nic:"960792076V",   gender:"Male",   joined:"2023-08-02", section:"Academic",     designation:"Demonstrator",              basicSalary:45409,  staffGrade:"officer"},
  {empNo:"250015", title:"Mr", initials:"V. D. A. S.",       lastName:"Karunasena",     fullName:"V. D. A. S. Karunasena",       dob:"1982-02-13", nic:"198204401443", gender:"Male",   joined:"2026-02-09", section:"Non Academic", designation:"Registrar",                 basicSalary:0,      staffGrade:"officer"},
  {empNo:"255003", title:"Ms", initials:"D. V. H.",          lastName:"Dissanayake",    fullName:"D. V. H. Dissanayake",         dob:"1987-05-01", nic:"876221411V",   gender:"Female", joined:"2024-03-05", section:"Non Academic", designation:"ICT Officer",               basicSalary:59581,  staffGrade:"officer"},
  {empNo:"20862",  title:"Mr", initials:"K. A.",             lastName:"Wijesiri",       fullName:"K. A. Wijesiri",               dob:"1966-08-11", nic:"662240532V",   gender:"Male",   joined:"2011-02-01", section:"Non Academic", designation:"Management Service Officer", basicSalary:68002,  staffGrade:"officer"},
  {empNo:"260026", title:"Ms", initials:"R. P.",             lastName:"Gulavita",       fullName:"R. P. Gulavita",               dob:"1967-08-24", nic:"677371811V",   gender:"Female", joined:"2024-01-08", section:"Non Academic", designation:"Management Service Officer", basicSalary:48571,  staffGrade:"officer"},
  {empNo:"21286",  title:"Ms", initials:"M. M. B. K.",       lastName:"Munasinghe",     fullName:"M. M. B. K. Munasinghe",       dob:"1980-11-13", nic:"808183668V",   gender:"Female", joined:"2021-08-11", section:"Non Academic", designation:"Management Service Officer", basicSalary:54128,  staffGrade:"officer"},
  {empNo:"20990",  title:"Ms", initials:"B. A.",             lastName:"Kanthi",         fullName:"B. A. Kanthi",                 dob:"1969-02-18", nic:"695491344V",   gender:"Female", joined:"2019-02-06", section:"Non Academic", designation:"Management Service Officer", basicSalary:53433,  staffGrade:"officer"},
  {empNo:"21255",  title:"Ms", initials:"A. M. E.",          lastName:"Weerathunga",    fullName:"A. M. E. Weerathunga",         dob:"1981-06-02", nic:"816540550V",   gender:"Female", joined:"2020-02-20", section:"Non Academic", designation:"Management Service Officer", basicSalary:56213,  staffGrade:"officer"},
  {empNo:"21290",  title:"Ms", initials:"H. R. S.",          lastName:"Gunaratne",      fullName:"H. R. S. Gunaratne",           dob:"1972-10-17", nic:"727914544V",   gender:"Female", joined:"2021-12-20", section:"Non Academic", designation:"Management Service Officer", basicSalary:56213,  staffGrade:"officer"},
  {empNo:"21273",  title:"Mr", initials:"P. H. S. V.",       lastName:"Senarathne",     fullName:"P. H. S. V. Senarathne",       dob:"1991-10-05", nic:"912792200V",   gender:"Male",   joined:"2021-02-25", section:"Non Academic", designation:"Management Service Officer", basicSalary:0,      staffGrade:"officer"},
  {empNo:"260051", title:"Ms", initials:"H. A. V. C. H.",    lastName:"Jayawardhana",   fullName:"H. A. V. C. H. Jayawardhana", dob:"1994-01-14", nic:"945142286V",   gender:"Female", joined:"2024-01-01", section:"Non Academic", designation:"Management Service Officer", basicSalary:46153,  staffGrade:"officer"},
  {empNo:"300072", title:"Ms", initials:"W. M. C. P.",       lastName:"Wanninayake",    fullName:"W. M. C. P. Wanninayake",      dob:"2001-01-01", nic:"198956702033", gender:"Female", joined:"2001-01-01", section:"Non Academic", designation:"Development Officer",       basicSalary:47814,  staffGrade:"officer"},
  {empNo:"21403",  title:"Ms", initials:"J. A. K.",          lastName:"Dilrukshi",      fullName:"J. A. K. Dilrukshi",           dob:"1978-08-03", nic:"787162584V",   gender:"Female", joined:"2005-07-15", section:"Non Academic", designation:"Development Officer",       basicSalary:54432,  staffGrade:"officer"},
  {empNo:"21624",  title:"Ms", initials:"A. M.",             lastName:"Dayarathna",     fullName:"Anuradha M. Dayarathna",       dob:"1976-08-14", nic:"767273002V",   gender:"Female", joined:"2005-10-20", section:"Non Academic", designation:"Development Officer",       basicSalary:54432,  staffGrade:"officer"},
  {empNo:"21667",  title:"Ms", initials:"H. H. U.",          lastName:"Aruna Shanthi",  fullName:"H. H. U. Aruna Shanthi",       dob:"1976-11-16", nic:"768212201V",   gender:"Female", joined:"2015-05-20", section:"Non Academic", designation:"Development Officer",       basicSalary:52226,  staffGrade:"officer"},
  {empNo:"300070", title:"Ms", initials:"L. B. I.",          lastName:"Nadeeka",        fullName:"L. B. I. Nadeeka",             dob:"2001-01-01", nic:"807883607V",   gender:"Female", joined:"2001-01-01", section:"Non Academic", designation:"Development Officer",       basicSalary:54683,  staffGrade:"officer"},
  {empNo:"21749",  title:"Ms", initials:"P. A. A.",          lastName:"Gunasekara",     fullName:"P. A. A. Gunasekara",          dob:"1984-11-22", nic:"848271764V",   gender:"Female", joined:"2016-12-02", section:"Non Academic", designation:"Development Officer",       basicSalary:54683,  staffGrade:"officer"},
  {empNo:"300071", title:"Ms", initials:"K. K. A. J.",       lastName:"Peiris",         fullName:"K. K. A. J. Peiris",           dob:"2001-01-01", nic:"767371730V",   gender:"Female", joined:"2001-01-01", section:"Non Academic", designation:"Development Officer",       basicSalary:54683,  staffGrade:"officer"},
  {empNo:"21811",  title:"Ms", initials:"G. N.",             lastName:"Jayathilaka",    fullName:"G. N. Jayathilaka",            dob:"1987-09-27", nic:"877711706V",   gender:"Female", joined:"2020-05-19", section:"Non Academic", designation:"Development Officer",       basicSalary:49469,  staffGrade:"officer"},
  {empNo:"23011",  title:"Ms", initials:"G. A. G. C.",       lastName:"Dilanka",        fullName:"G. A. G. C. Dilanka",          dob:"1994-08-04", nic:"199471703162", gender:"Female", joined:"2021-04-01", section:"Non Academic", designation:"ICT Assistant",             basicSalary:0,      staffGrade:"officer"},
  {empNo:"22981",  title:"Ms", initials:"O. R. C.",          lastName:"Udayangani",     fullName:"O. R. C. Udayangani",          dob:"1993-11-03", nic:"938080011V",   gender:"Female", joined:"2019-07-03", section:"Non Academic", designation:"ICT Assistant",             basicSalary:45781,  staffGrade:"officer"},
  {empNo:"23921",  title:"Ms", initials:"P. G. P.",          lastName:"Ruvini",         fullName:"P. G. P. Ruvini",              dob:"1978-06-17", nic:"786690285V",   gender:"Female", joined:"2017-01-02", section:"Non Academic", designation:"Receptionist",              basicSalary:48946,  staffGrade:"officer"},
  {empNo:"25147",  title:"Ms", initials:"W.",                lastName:"Karunawathi",    fullName:"W. Karunawathi",               dob:"1966-03-30", nic:"665902234V",   gender:"Female", joined:"1999-11-01", section:"Non Academic", designation:"Office Employee Service",    basicSalary:50353,  staffGrade:"junior"},
  {empNo:"25238",  title:"Mr", initials:"S. R. A. C.",       lastName:"Ruwankumara",    fullName:"S. R. A. C. Ruwankumara",      dob:"1976-06-12", nic:"761641018V",   gender:"Male",   joined:"2019-04-01", section:"Non Academic", designation:"Office Employee Service",    basicSalary:47533,  staffGrade:"junior"},
  {empNo:"24725",  title:"Mr", initials:"S. S.",             lastName:"Jayarathna",     fullName:"S. Sumith Jayarathna",         dob:"1970-07-22", nic:"702042232V",   gender:"Male",   joined:"2002-06-03", section:"Non Academic", designation:"Driver",                    basicSalary:50797,  staffGrade:"junior"},
  {empNo:"24764",  title:"Mr", initials:"S. G. C. R.",       lastName:"Samaraweera",    fullName:"S. G. C. R. Samaraweera",      dob:"1985-07-09", nic:"851910670V",   gender:"Male",   joined:"2013-11-22", section:"Non Academic", designation:"Driver",                    basicSalary:43669,  staffGrade:"junior"},
  {empNo:"25544",  title:"Ms", initials:"K. W. D.",          lastName:"Nadeeshani",     fullName:"K. W. Dumini Nadeeshani",      dob:"1982-11-26", nic:"828313800V",   gender:"Female", joined:"2014-01-27", section:"Non Academic", designation:"Lab Assistant",             basicSalary:41161,  staffGrade:"junior"},
  {empNo:"25541",  title:"Mr", initials:"A. N.",             lastName:"Jayawardhana",   fullName:"A. N. Jayawardhana",           dob:"1974-08-27", nic:"740872982V",   gender:"Male",   joined:"2017-01-02", section:"Non Academic", designation:"Lab Assistant",             basicSalary:41161,  staffGrade:"junior"},
  {empNo:"25571",  title:"Mr", initials:"K. A.",             lastName:"Arunashantha",   fullName:"K. A. Arunashantha",           dob:"1977-02-21", nic:"770522625V",   gender:"Male",   joined:"2020-09-25", section:"Non Academic", designation:"Lab Assistant",             basicSalary:41161,  staffGrade:"junior"},
  {empNo:"26213",  title:"Mr", initials:"D. M. S. D.",       lastName:"Chathuranga",    fullName:"D. M. S. D. Chathuranga",      dob:"1987-03-01", nic:"870611366V",   gender:"Male",   joined:"2018-03-02", section:"Non Academic", designation:"Field Assistant",           basicSalary:41161,  staffGrade:"junior"},
  {empNo:"26718",  title:"Mr", initials:"M. A. K.",          lastName:"Pradeep Kumara", fullName:"M. A. K. Pradeep Kumara",      dob:"1987-08-29", nic:"872423478V",   gender:"Male",   joined:"2011-09-14", section:"Non Academic", designation:"Field Assistant",           basicSalary:41445,  staffGrade:"junior"},
  {empNo:"25652",  title:"Mr", initials:"N. A. R.",          lastName:"De Alwis",       fullName:"N. A. R. De Alwis",            dob:"1975-01-01", nic:"750013597V",   gender:"Male",   joined:"2016-08-30", section:"Non Academic", designation:"Watcher",                   basicSalary:49765,  staffGrade:"junior"},
  {empNo:"25654",  title:"Mr", initials:"W. A. S.",          lastName:"Perera",         fullName:"W. A. S. Perera",              dob:"1977-01-04", nic:"770043964V",   gender:"Male",   joined:"2016-09-09", section:"Non Academic", designation:"Watcher",                   basicSalary:49765,  staffGrade:"junior"},
  {empNo:"26210",  title:"Mr", initials:"A. P. R.",          lastName:"Wijesurendra",   fullName:"A. G. R. Wijesurendra",        dob:"1974-01-08", nic:"740080156V",   gender:"Male",   joined:"2021-03-08", section:"Non Academic", designation:"Field Assistant",           basicSalary:41497,  staffGrade:"junior"},
  {empNo:"24226",  title:"Mr", initials:"H. C. S. D.",       lastName:"De Silva",       fullName:"H. C. S. D. De Silva",         dob:"1980-08-30", nic:"802431210V",   gender:"Male",   joined:"2021-03-17", section:"Non Academic", designation:"Field Assistant",           basicSalary:42661,  staffGrade:"junior"},
  {empNo:"350049", title:"Mr", initials:"G. W. M. P. S.",    lastName:"Premachandra",   fullName:"G. W. M. P. S. Premachandra",  dob:"1999-02-27", nic:"990581835V",   gender:"Male",   joined:"2023-05-15", section:"Non Academic", designation:"Field Assistant",           basicSalary:38035,  staffGrade:"junior"},
  {empNo:"350048", title:"Mr", initials:"T. M. J. J.",       lastName:"Kumara",         fullName:"T. M. J. J. Kumara",           dob:"1976-07-30", nic:"762124394V",   gender:"Male",   joined:"2023-05-15", section:"Non Academic", designation:"Field Assistant",           basicSalary:38345,  staffGrade:"junior"},
  {empNo:"350046", title:"Mr", initials:"K. A. L. U. W.",    lastName:"Kumara",         fullName:"K. A. L. U. W. Kumara",        dob:"1977-06-20", nic:"197717203209", gender:"Male",   joined:"2023-05-15", section:"Non Academic", designation:"Field Assistant",           basicSalary:38345,  staffGrade:"junior"},
  {empNo:"26136",  title:"Ms", initials:"G. G.",             lastName:"Renuka",         fullName:"G. G. Renuka",                 dob:"1977-02-07", nic:"775384778V",   gender:"Female", joined:"2023-01-02", section:"Non Academic", designation:"Field Assistant",           basicSalary:43513,  staffGrade:"junior"},
  {empNo:"350050", title:"Ms", initials:"A. B. U.",          lastName:"Manjula",        fullName:"A. B. Udani Manjula",          dob:"2000-12-09", nic:"200084403756", gender:"Female", joined:"2001-01-01", section:"Non Academic", designation:"Field Assistant",           basicSalary:38345,  staffGrade:"junior"},
  {empNo:"350047", title:"Mr", initials:"R. A. S.",          lastName:"Ranasinghe",     fullName:"R. A. Sampath Ranasinghe",     dob:"1979-12-20", nic:"197935502351", gender:"Male",   joined:"2023-05-15", section:"Non Academic", designation:"Field Assistant",           basicSalary:38345,  staffGrade:"junior"},
];

// ═══════════════════════════════════════════════════════════════
// ROLES & PERMISSIONS
// Director  → ALL staff (Academic + Non Academic)
// Registrar → Non Academic only
// Leave Officer → Recommend only (no approve)
// ICT Officer → Attendance only
// ═══════════════════════════════════════════════════════════════
const FIXED_ROLES = { "11004":"director","250015":"registrar","20990":"leave_officer","255003":"ict_officer" };
const ROLE_META = {
  director:     {label:"Director",      color:"#f59e0b",icon:"👔"},
  registrar:    {label:"Registrar",     color:"#a78bfa",icon:"📋"},
  leave_officer:{label:"Leave Officer", color:"#22c55e",icon:"📝"},
  ict_officer:  {label:"ICT Officer",   color:"#0ea5e9",icon:"💻"},
  staff:        {label:"Staff",         color:"#64748b",icon:"👤"},
};

// ═══════════════════════════════════════════════════════════════
// LEAVE ENTITLEMENT CALCULATION
// Based on uploaded document:
//   Officer: Casual=21/yr (calendar year basis), Vacation=24/yr (appointment basis first 2yr then calendar)
//   Junior:  Casual=0 (first year, then 21/yr after 1yr continuous service), Sick=24/yr (prorated first 9mo)
// ═══════════════════════════════════════════════════════════════
function getEntitlement(emp, year) {
  const joined = new Date(emp.joined);
  const yearStart = new Date(year, 0, 1);
  const yearEnd   = new Date(year, 11, 31);
  const isJunior  = emp.staffGrade === "junior";
  const svcMonths = Math.floor((new Date() - joined) / (30.44 * 864e5));
  const svcYearsAtYearStart = (yearStart - joined) / (365.25 * 864e5);

  let casual = 0, vacation = 0;

  if (isJunior) {
    // Junior staff: casual only after 1 full year of continuous service
    const oneYearDate = new Date(joined); oneYearDate.setFullYear(oneYearDate.getFullYear()+1);
    if (yearStart >= oneYearDate) casual = 21;
    else if (yearEnd >= oneYearDate) casual = 0; // mid-year eligibility — conservative
    else casual = 0;
    // Sick leave: first 9 months prorated, then 24/yr
    const nineMonths = new Date(joined); nineMonths.setMonth(nineMonths.getMonth()+9);
    const twelveMonths = new Date(joined); twelveMonths.setFullYear(twelveMonths.getFullYear()+1);
    if (yearStart >= twelveMonths) vacation = 24;
    else if (yearStart < nineMonths) {
      const monthsServed = Math.min(9, (yearEnd - joined) / (30.44*864e5));
      vacation = Math.round((24/9)*Math.max(0,monthsServed));
    } else vacation = Math.round(24 * (twelveMonths - yearStart) / (twelveMonths - nineMonths));
  } else {
    // Officer: casual = 21 from any appointment date in that calendar year
    casual = svcYearsAtYearStart >= -1 ? 21 : 0; // available from joined year
    // Vacation: first 2 years on appointment basis (24/yr), then calendar year basis
    const twoYearDate = new Date(joined); twoYearDate.setFullYear(twoYearDate.getFullYear()+2);
    if (yearStart >= twoYearDate) vacation = 24;
    else {
      const monthsInYear = Math.min(12, Math.max(0, (Math.min(yearEnd, twoYearDate) - Math.max(yearStart, joined)) / (30.44*864e5)));
      vacation = Math.round((24/12)*monthsInYear);
    }
  }
  return { casual, vacation, halfPay:0, noPay:0, maternity: emp.gender==="Female"?84:0, special:5, study:10 };
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
const SL_HOLIDAYS = ["2025-01-14","2025-02-04","2025-02-12","2025-03-13","2025-04-13","2025-04-14","2025-04-18","2025-05-01","2025-05-12","2025-06-10","2025-07-10","2025-08-08","2025-09-05","2025-10-06","2025-10-20","2025-11-04","2025-12-25","2026-01-14","2026-02-04","2026-04-13","2026-04-14","2026-05-01","2026-12-25"];
const isWkendHol = d => { const dt=new Date(d),day=dt.getDay(); return day===0||day===6||SL_HOLIDAYS.includes(d); };
function countWD(from,to){ if(!from||!to)return 0; let c=0; const cur=new Date(from),end=new Date(to); while(cur<=end){if(!isWkendHol(cur.toISOString().slice(0,10)))c++; cur.setDate(cur.getDate()+1);} return c; }
const today=()=>new Date().toISOString().slice(0,10);
const todayLong=()=>new Date().toLocaleDateString("en-LK",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
const fmtD=d=>d?new Date(d).toLocaleDateString("en-GB"):"-";
const getSvcYears=j=>Math.max(0,Math.floor((new Date()-new Date(j))/(365.25*864e5)));
const getSvcMonths=j=>Math.max(0,Math.floor((new Date()-new Date(j))/(30.44*864e5)));
const currYear=new Date().getFullYear();

function getUsedLeave(empNo, leaveRecords, type, year) {
  return (leaveRecords[empNo]||[]).filter(r=>r.status==="Approved"&&r.type===type&&r.from.startsWith(String(year))).reduce((a,b)=>a+b.days,0);
}

function getLeaveBalance(emp, leaveRecords, year=currYear) {
  const ent = getEntitlement(emp, year);
  const types = {
    "Casual Leave":        {total:ent.casual,      color:"#3b82f6",icon:"📋"},
    "Vacation/Sick Leave": {total:ent.vacation,    color:"#22c55e",icon:"🌴"},
    "Half Pay Leave":      {total:0,               color:"#f59e0b",icon:"🏥"},
    "No Pay Leave":        {total:0,               color:"#6b7280",icon:"📌"},
    "Maternity Leave":     {total:ent.maternity,   color:"#ec4899",icon:"👶"},
    "Special Leave":       {total:ent.special,     color:"#0ea5e9",icon:"⭐"},
    "Study Leave (Local)": {total:ent.study,       color:"#8b5cf6",icon:"📚"},
  };
  return Object.entries(types).map(([type,info])=>{
    const used=getUsedLeave(emp.empNo,leaveRecords,type,year);
    return { type, total:info.total, color:info.color, icon:info.icon, used, balance:info.total===0?"∞":Math.max(0,info.total-used) };
  });
}

// Abnormal leave threshold: >15 casual in a year, or >20 vacation in a year
function isAbnormal(emp, leaveRecords, year=currYear) {
  const cas=getUsedLeave(emp.empNo,leaveRecords,"Casual Leave",year);
  const vac=getUsedLeave(emp.empNo,leaveRecords,"Vacation/Sick Leave",year);
  const ent=getEntitlement(emp,year);
  return { cas, vac, abnormal: cas>(ent.casual*0.75)||vac>(ent.vacation*0.75), severe: cas>=ent.casual||vac>=ent.vacation };
}

// Medical cert overdue: medical leave approved >3 working days ago, no cert noted
function medCertOverdue(emp, leaveRecords) {
  const overdues=[];
  (leaveRecords[emp.empNo]||[]).filter(r=>r.status==="Approved"&&(r.type==="Vacation/Sick Leave"||r.type==="Half Pay Leave")&&!r.medCertReceived).forEach(r=>{
    const daysSince=Math.floor((new Date()-new Date(r.approvedOn||r.appliedOn))/864e5);
    if(daysSince>3) overdues.push(r);
  });
  return overdues;
}

// ═══════════════════════════════════════════════════════════════
// TIME & SHORT LEAVE RULES
// Office hours:   08:30 – 16:15
// Short leave morning:  08:30 – 10:00 (all staff)
// Short leave evening:  14:45 – 16:15 (officers) / 15:00 – 16:15 (junior)
// Short leave quota: 2 per month (both officer and junior)
// Late rule 1: arrive ≤09:00 → "minor late" — every 2 = forgiven, no cover
// Late rule 2: arrive >09:00 → must stay until 16:45 to cover
// ═══════════════════════════════════════════════════════════════
const OFFICE_START  = "08:30";
const OFFICE_END    = "16:15";
const LATE_GRACE    = "09:00"; // lates up to here = minor (2 forgiven)
const COVER_END     = "16:45"; // must stay until if late >09:00
const SHORT_LEAVE_MORNING_START = "08:30";
const SHORT_LEAVE_MORNING_END   = "10:00";
const SHORT_LEAVE_EVE_OFFICER   = "14:45"; // officer evening short leave start
const SHORT_LEAVE_EVE_JUNIOR    = "15:00"; // junior evening short leave start
const SHORT_LEAVE_EVE_END       = "16:15";
const SHORT_LEAVE_PER_MONTH     = 2;

function timeCmp(a, b) { // returns -1 0 1
  const [ah,am]=a.split(":").map(Number), [bh,bm]=b.split(":").map(Number);
  return ah!==bh?Math.sign(ah-bh):Math.sign(am-bm);
}
function timeToMins(t){ const [h,m]=t.split(":").map(Number); return h*60+m; }

// Classify a scan-in time for a staff member
function classifyScanIn(scanTime, emp) {
  if(!scanTime) return {status:"absent", late:false, minorLate:false, coverUntil:null};
  if(timeCmp(scanTime, OFFICE_START)<=0)
    return {status:"present", late:false, minorLate:false, coverUntil:null};
  if(timeCmp(scanTime, LATE_GRACE)<=0)
    return {status:"minor_late", late:true, minorLate:true, coverUntil:null, scanTime};
  // Late after 09:00 — must cover
  return {status:"late", late:true, minorLate:false, coverUntil:COVER_END, scanTime};
}

// Determine if a short leave is valid for this staff member & type
function shortLeaveValid(type, emp) {
  // type: "morning" | "evening"
  if(type==="morning") return true; // both grades
  if(type==="evening") return true; // both grades (different start time handled separately)
  return false;
}

function shortLeaveWindow(type, emp) {
  if(type==="morning") return `${SHORT_LEAVE_MORNING_START} – ${SHORT_LEAVE_MORNING_END}`;
  const start = emp.staffGrade==="junior" ? SHORT_LEAVE_EVE_JUNIOR : SHORT_LEAVE_EVE_OFFICER;
  return `${start} – ${SHORT_LEAVE_EVE_END}`;
}

// Get month key from date string
function monthKey(date){ return date.slice(0,7); }

// Count short leaves used in a month for an employee
function shortLeavesUsed(empNo, shortLeaveRecords, month) {
  return (shortLeaveRecords[empNo]||[]).filter(r=>r.date.startsWith(month)).length;
}

// Count minor lates in a month — every 2 are a pair (forgiven)
function minorLateInfo(empNo, attendanceData) {
  // attendanceData[date][empNo] = {status, scanTime, ...}
  const counts = {};
  Object.entries(attendanceData||{}).forEach(([date,dayData])=>{
    const m=date.slice(0,7);
    const d=dayData[empNo];
    if(d?.minorLate){
      counts[m]=(counts[m]||0)+1;
    }
  });
  return counts; // { "2026-03": 3, ... } — odd = 1 uncovered, even = all forgiven
}

// Generate simulated finger scan times (realistic distribution)
function generateScanData(empNo, date) {
  const seed = empNo.split("").reduce((a,c)=>a+c.charCodeAt(0),0) +
               date.split("-").reduce((a,c)=>a+parseInt(c),0);
  const rng = (seed*9301+49297)%233280/233280;
  if(rng<0.04) return null;                     // 4% no scan
  if(rng<0.10) return `09:${String(Math.floor((rng*1000)%45+1)).padStart(2,"0")}`; // 6% late >09:00
  if(rng<0.20) return `08:${String(Math.floor((rng*1000)%29+31)).padStart(2,"0")}`; // 10% minor late 08:31-08:59
  if(rng<0.30) return `09:00`;                  // 10% exactly 09:00 (minor late boundary)
  const mins = Math.floor(rng*28);
  return `08:${String(mins).padStart(2,"0")}`;  // 70% on time before 08:30 → actually some will be 08:00–08:29
}

// ═══════════════════════════════════════════════════════════════
// OFFICIAL FORM GENERATORS
// ═══════════════════════════════════════════════════════════════
function genForm125a(rec, emp) {
  const ent=getEntitlement(emp,new Date().getFullYear());
  const isCas=rec.type==="Casual Leave"||rec.type==="Special Leave"||rec.type==="Study Leave (Local)";
  const isVac=rec.type==="Vacation/Sick Leave"||rec.type==="Maternity Leave";
  return `╔══════════════════════════════════════════════════════════════════════════╗
║  නිවාඩු ඉල්ලුම් පතුය / APPLICATION FOR LEAVE — General 125 අ/a         ║
║  Ch.XII s.2:1 · Establishments Code · COT Ratnapura (DTET)              ║
╠══════════════════╦═══════════════════════════════════════════════════════╣
║ Name / නම        ║ ${emp.fullName.padEnd(53)}║
╠══════════════════╬═══════════════════════════════════════════════════════╣
║ Designation      ║ ${emp.designation.padEnd(53)}║
╠══════════════════╬═══════════════════════════════════════════════════════╣
║ Ministry / Dept  ║ College of Technology Ratnapura (DTET)                ║
╠════════════╦═════╦════════════╦═══════════╦══════════════════════════════╣
║ Days Applied║C:${isCas?String(rec.days).padEnd(4):"-   "}║V:${isVac?String(rec.days).padEnd(4):"-   "}       ║O:${(!isCas&&!isVac)?String(rec.days).padEnd(4):"-   "}      ║ Leave in current year: .........║
╠════════════╩═════╩════════════╩═══════════╩══════════════════════════════╣
║ 1st Appointment: ${emp.joined}  Service: ${getSvcYears(emp.joined)} years ${getSvcMonths(emp.joined)%12} months     ║
║ Grade: ${emp.staffGrade==="junior"?"Junior Staff":"Officer".padEnd(63)}      ║
╠══════════════════════════════════════════════════════════════════════════╣
║ Leave from: ${rec.from.padEnd(16)} To: ${rec.to.padEnd(16)} Days: ${String(rec.days).padEnd(6)}              ║
╠══════════════════════════════════════════════════════════════════════════╣
║ Reason: ${rec.reason.substring(0,63).padEnd(63)}║
╠══════════════════════════════════════════════════════════════════════════╣
║ Applicant signature: ............................  Date: ${today()}    ║
╠══════════════════════════════════════════════════════════════════════════╣
║ Recommended / Not Recommended          Leave Allowed / Not Allowed       ║
║ Leave Officer: ......................   Head of Dept: .................   ║
║ Noted in Leave Register (Gen 190) · Folio No: ..........                 ║
╚══════════════════════════════════════════════════════════════════════════╝`.trim();
}

function genForm190Entry(rec, emp) {
  const isCas=rec.type==="Casual Leave"||rec.type==="Special Leave"||rec.type==="Study Leave (Local)";
  const isVac=rec.type==="Vacation/Sick Leave"||rec.type==="Maternity Leave";
  const isHP=rec.type==="Half Pay Leave"; const isNP=rec.type==="No Pay Leave";
  return `║${rec.from.slice(5).padEnd(7)}║${rec.to.slice(5).padEnd(7)}║${isCas?String(rec.days).padEnd(7):"       "}║${isVac?String(rec.days).padEnd(7):"       "}║${"       "}║${"           "}║${isHP?(" - "+rec.days).padEnd(10):"          "}║${isNP?(" - "+rec.days).padEnd(10):"          "}║ ${rec.reason.substring(0,30).padEnd(30)} ║`;
}

function genMonthlyGen190(leaveRecords, month) {
  const [yr,mo]=month.split("-").map(Number);
  const monthName=new Date(yr,mo-1,1).toLocaleDateString("en-LK",{month:"long",year:"numeric"});
  let lines=`╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗\n`;
  lines+=`║  නිවාඩු ලේඛනය / LEAVE REGISTER  —  General 190  ·  ${monthName.padEnd(50)}║\n`;
  lines+=`║  College of Technology Ratnapura (DTET)                                                          ║\n`;
  lines+=`╠═══════╦═══════════════════════════════╦═══════╦═══════╦═══════╦═══════╦═══════════╦══════════╦══════════╦════════════════════════════════╣\n`;
  lines+=`║ Emp#  ║ Name                          ║ From  ║  To   ║  Cas  ║  Vac  ║  Lapsed   ║ Half Pay ║  No Pay  ║ Reason                         ║\n`;
  lines+=`╠═══════╬═══════════════════════════════╬═══════╬═══════╬═══════╬═══════╬═══════════╬══════════╬══════════╬════════════════════════════════╣\n`;
  let total={cas:0,vac:0,hp:0,np:0};
  STAFF.forEach(emp=>{
    const recs=(leaveRecords[emp.empNo]||[]).filter(r=>r.status==="Approved"&&r.from.startsWith(month));
    recs.forEach(r=>{
      const isCas=r.type==="Casual Leave"||r.type==="Special Leave"; const isVac=r.type==="Vacation/Sick Leave"||r.type==="Maternity Leave"; const isHP=r.type==="Half Pay Leave"; const isNP=r.type==="No Pay Leave";
      if(isCas) total.cas+=r.days; if(isVac) total.vac+=r.days; if(isHP) total.hp+=r.days; if(isNP) total.np+=r.days;
      lines+=`║${emp.empNo.padEnd(7)}║${emp.fullName.substring(0,31).padEnd(31)}║${r.from.slice(5).padEnd(7)}║${r.to.slice(5).padEnd(7)}║${isCas?String(r.days).padEnd(7):"       "}║${isVac?String(r.days).padEnd(7):"       "}║${"           "}║${isHP?(" - "+r.days).padEnd(10):"          "}║${isNP?(" - "+r.days).padEnd(10):"          "}║ ${r.reason.substring(0,30).padEnd(30)} ║\n`;
    });
  });
  lines+=`╠═══════╩═══════════════════════════════╩═══════╩═══════╬═══════╬═══════╬═══════════╬══════════╬══════════╬════════════════════════════════╣\n`;
  lines+=`║                                         MONTHLY TOTALS ║${String(total.cas).padEnd(7)}║${String(total.vac).padEnd(7)}║           ║${total.hp?"- "+total.hp:"         "}║${total.np?"- "+total.np:"         "}║                                ║\n`;
  lines+=`╚════════════════════════════════════════════════════════╩═══════╩═══════╩═══════════╩══════════╩══════════╩════════════════════════════════╝`;
  return lines;
}

function genLeaveSummary(emp, leaveRecords, from, to, label) {
  const recs=(leaveRecords[emp.empNo]||[]).filter(r=>r.status==="Approved"&&r.from>=from&&r.from<=to);
  const totals={};
  recs.forEach(r=>{ totals[r.type]=(totals[r.type]||0)+r.days; });
  const ent=getEntitlement(emp,new Date(from).getFullYear());
  let out=`╔══════════════════════════════════════════════════════════════════════════╗\n`;
  out+=`║  LEAVE SUMMARY — ${label.padEnd(53)}║\n`;
  out+=`║  ${emp.fullName.padEnd(70)}║\n`;
  out+=`║  ${emp.designation} · Emp# ${emp.empNo} · ${emp.section.padEnd(40)}║\n`;
  out+=`║  Joined: ${emp.joined} · Service: ${getSvcYears(emp.joined)} yrs · Grade: ${emp.staffGrade.padEnd(20)}║\n`;
  out+=`╠══════════════════════╦═════════════╦═════════════╦════════════════════╣\n`;
  out+=`║ Leave Type           ║ Entitlement ║ Used        ║ Balance            ║\n`;
  out+=`╠══════════════════════╬═════════════╬═════════════╬════════════════════╣\n`;
  const types=["Casual Leave","Vacation/Sick Leave","Half Pay Leave","No Pay Leave","Maternity Leave","Special Leave","Study Leave (Local)"];
  const entMap={"Casual Leave":ent.casual,"Vacation/Sick Leave":ent.vacation,"Half Pay Leave":"—","No Pay Leave":"—","Maternity Leave":ent.maternity,"Special Leave":ent.special,"Study Leave (Local)":ent.study};
  types.forEach(t=>{
    const used=totals[t]||0; const e=entMap[t]; const bal=typeof e==="number"?Math.max(0,e-used):"—";
    out+=`║ ${t.padEnd(21)}║ ${String(e).padEnd(12)}║ ${String(used||"-").padEnd(12)}║ ${String(bal).padEnd(19)}║\n`;
  });
  out+=`╠══════════════════════╩═════════════╩═════════════╩════════════════════╣\n`;
  out+=`║  TOTAL DAYS TAKEN IN PERIOD: ${String(recs.reduce((a,b)=>a+b.days,0)).padEnd(43)}║\n`;
  out+=`╠══════════════════════════════════════════════════════════════════════════╣\n`;
  out+=`║  INDIVIDUAL RECORDS:                                                     ║\n`;
  out+=`║  ${"Type".padEnd(22)}${"From".padEnd(12)}${"To".padEnd(12)}${"Days".padEnd(6)}Reason                        ║\n`;
  out+=`║  ${"─".repeat(68)}║\n`;
  recs.forEach(r=>{ out+=`║  ${r.type.padEnd(22)}${r.from.padEnd(12)}${r.to.padEnd(12)}${String(r.days).padEnd(6)}${r.reason.substring(0,30).padEnd(30)}║\n`; });
  out+=`╚══════════════════════════════════════════════════════════════════════════╝`;
  return out;
}

function genAbnormalLetter(emp, leaveRecords, year=currYear) {
  const ab=isAbnormal(emp,leaveRecords,year);
  const ent=getEntitlement(emp,year);
  const refNo=`COTR/2/ADM/4/${year}-${String(Math.floor(Math.random()*900)+100)}`;
  return `               Ministry of Education, Higher Education and Vocational Training
                  Department of Technical Education and Training
                       College of Technology – Ratnapura
                              Palm Garden, Ratnapura

Our No: ${refNo}                              Date: ${todayLong()}

${emp.title}. ${emp.fullName}
${emp.designation}
College of Technology Ratnapura.

Dear ${emp.title}. ${emp.lastName},

       SUBJECT: ADVISORY ON EXCESSIVE LEAVE USAGE — ${year}

This letter is written to draw your attention to your leave usage for the year ${year}, which has exceeded the normal threshold.

Your leave record for ${year}:
  Casual Leave taken   : ${ab.cas} days  (Entitlement: ${ent.casual} days)
  Vacation/Sick Leave  : ${ab.vac} days  (Entitlement: ${ent.vacation} days)

${ab.severe?`Your leave usage has REACHED OR EXCEEDED your annual entitlement. This may adversely affect your service record and salary increments.`:`Your leave usage has exceeded 75% of your annual entitlement. We advise you to manage your remaining leave carefully.`}

You are kindly requested to:
  1. Maintain regular attendance at your place of duty.
  2. Ensure all future leave applications are submitted in advance.
  3. Submit all required supporting documents promptly.
  4. Consult the Leave Officer (B. A. Kanthi) for any leave-related queries.

Continued excessive leave may result in disciplinary action under the Establishments Code.

Yours faithfully,

.......................................
L. A. Kithsiri
Director
College of Technology Ratnapura
Tel: 0452232390`;
}

function genMedCertReminder(emp, overdueRecs) {
  const refNo=`COTR/2/ADM/4/${currYear}-${String(Math.floor(Math.random()*900)+100)}`;
  return `               College of Technology – Ratnapura (DTET)
                              Palm Garden, Ratnapura

Our No: ${refNo}                              Date: ${todayLong()}

${emp.title}. ${emp.fullName}
${emp.designation}

Dear ${emp.title}. ${emp.lastName},

       SUBJECT: MEDICAL CERTIFICATE SUBMISSION — REMINDER

This is to remind you that the following sick/half-pay leave periods require a Medical Certificate to be submitted to the Leave Officer immediately:

${overdueRecs.map(r=>`  Leave: ${r.from} to ${r.to} (${r.days} days) — Applied: ${r.appliedOn}`).join("\n")}

Under the Establishments Code Chapter XII and relevant circulars, medical certificates must be submitted within 3 working days of leave commencement. Failure to submit may result in the leave being converted to No Pay Leave.

Please submit your medical certificate(s) to the Leave Officer (B. A. Kanthi) without delay.

Yours faithfully,

.......................................
L. A. Kithsiri
Director / V. D. A. S. Karunasena
Registrar, College of Technology Ratnapura`;
}

function genDTETLetter(emp, leaveRecords) {
  const recs=(leaveRecords[emp.empNo]||[]).filter(r=>r.status==="Approved");
  const years={};
  recs.forEach(r=>{ const y=r.from.slice(0,4); if(!years[y]) years[y]={cas:0,vac:0,hp:0,np:0}; if(r.type==="Casual Leave"||r.type==="Special Leave") years[y].cas+=r.days; else if(r.type==="Vacation/Sick Leave"||r.type==="Maternity Leave") years[y].vac+=r.days; else if(r.type==="Half Pay Leave") years[y].hp+=r.days; else if(r.type==="No Pay Leave") years[y].np+=r.days; });
  const refNo=`COTR/2/ADM/4/${currYear}-${String(Math.floor(Math.random()*900)+100)}`;
  let rows=""; const ys=Object.keys(years).sort();
  if(!ys.length) rows=`║  ${currYear}  ║       -        ║   -   ║     -      ║    -    ║     -     ║\n`;
  else ys.forEach(y=>{ const d=years[y]; rows+=`║  ${y}  ║  ${(d.cas||"-").toString().padEnd(12)}  ║  ${(d.vac||"-").toString().padEnd(5)}  ║  ${("-").padEnd(8)}  ║  ${(d.hp||"-").toString().padEnd(7)}  ║  ${(d.np||"-").toString().padEnd(7)}  ║\n`; });
  return `               Ministry of Education, Higher Education and Vocational Training
                  Department of Technical Education and Training
                       College of Technology – Ratnapura
                              Palm Garden, Ratnapura

Our No: ${refNo}                              Date: ${todayLong()}

අධ්‍යක්ෂ ජනරාල්, කාර්මික අධ්‍යාපන හා පුහුණු කිරීම් දෙපාර්තමේන්තුව,
අංක 557, බිල්කාර් මාවත, කොළඹ 10.

           නිවාඩු පිළිබඳ විස්තාර ඉදිරිපත් කිරීම.
           ${emp.fullName} — ${emp.designation}

╔═══════╦════════════════╦═══════╦════════════╦═════════╦═══════════╗
║ වර්ෂය ║  අනියම් නිවාඩු║ විවේක ║ ඉ/විවේක   ║ අඩ වැටුප║ වැටුප් රහිත║
╠═══════╬════════════════╬═══════╬════════════╬═════════╬═══════════╣
${rows}╚═══════╩════════════════╩═══════╩════════════╩═════════╩═══════════╝

ලේඛකාධිකාරී / Registrar: V. D. A. S. Karunasena
College of Technology Ratnapura — Tel: 0452232390`;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [pins, setPins] = useState({"11004":"1234","250015":"5678","20990":"1111","255003":"2222"});
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loginEmp, setLoginEmp] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("home");
  const [leaveRecords, setLeaveRecords] = useState({});
  const [attendance, setAttendance] = useState({});     // [date][empNo] = {status, scanTime, minorLate, coverUntil}
  const [scanData, setScanData] = useState({});          // [date][empNo] = rawScanTime
  const [shortLeaveRecs, setShortLeaveRecs] = useState({});  // [empNo] = [{date, type, month}]
  const [form, setForm] = useState({type:"Casual Leave",from:"",to:"",reason:""});
  const [formMsg, setFormMsg] = useState(null);
  const [modal, setModal] = useState(null);
  const [attDate, setAttDate] = useState(today());
  const [reportMonth, setReportMonth] = useState(today().slice(0,7));
  const [summaryEmp, setSummaryEmp] = useState("");
  const [summaryFrom, setSummaryFrom] = useState(currYear+"-01-01");
  const [summaryTo, setSummaryTo] = useState(today());
  const [summaryPeriod, setSummaryPeriod] = useState("year");
  const [pinModal, setPinModal] = useState(false);
  const [newPin, setNewPin] = useState(""); const [confirmPin, setConfirmPin] = useState("");
  const [resetTarget, setResetTarget] = useState(""); const [resetVal, setResetVal] = useState("");
  const [notifDismissed, setNotifDismissed] = useState([]);
  const chatEnd = useRef(null);
  const [chatMsgs, setChatMsgs] = useState([]); const [chatInput, setChatInput] = useState(""); const [chatLoading, setChatLoading] = useState(false); const [showChat, setShowChat] = useState(false);
  useEffect(()=>{ chatEnd.current?.scrollIntoView({behavior:"smooth"}); },[chatMsgs]);

  // ── Derived ──────────────────────────────────────────────────
  const myLeaves = currentUser?(leaveRecords[currentUser.empNo]||[]):[];
  const myBalances = currentUser?getLeaveBalance(currentUser,leaveRecords):[];
  const pending = Object.entries(leaveRecords).flatMap(([e,rs])=>rs.filter(r=>r.status==="Pending").map(r=>({...r,empNo:e})));
  // Statuses: Pending → LO Recommended → (Non Academic: Reg Recommended →) Approved/Rejected
  const loRecommended  = Object.entries(leaveRecords).flatMap(([e,rs])=>rs.filter(r=>r.status==="LO Recommended").map(r=>({...r,empNo:e})));
  const regRecommended = Object.entries(leaveRecords).flatMap(([e,rs])=>rs.filter(r=>r.status==="Reg Recommended").map(r=>({...r,empNo:e})));
  const recommended    = [...loRecommended,...regRecommended];
  const allLeaves = Object.entries(leaveRecords).flatMap(([e,rs])=>rs.map(r=>({...r,empNo:e})));
  const svcMonths = currentUser?getSvcMonths(currentUser.joined):0;

  // Notifications
  const notifications = currentUser ? (() => {
    const notifs = [];
    myBalances.forEach(b=>{ if(b.balance!=="∞"&&b.total>0&&b.balance<=3&&b.balance>0) notifs.push({id:`bal-${b.type}`,type:"warn",msg:`⚠️ Only ${b.balance} ${b.type} day(s) remaining for ${currYear}.`}); });
    if(myBalances.find(b=>b.type==="Casual Leave")?.balance===0) notifs.push({id:"cas-zero",type:"danger",msg:"❌ Casual Leave fully used for this year."});
    const medOverdue=medCertOverdue(currentUser,leaveRecords);
    if(medOverdue.length>0) notifs.push({id:"med-cert",type:"danger",msg:`🏥 Medical certificate overdue for ${medOverdue.length} leave period(s). Submit immediately.`});
    const ab=isAbnormal(currentUser,leaveRecords);
    if(ab.severe) notifs.push({id:"abnormal",type:"danger",msg:"🚨 You have exhausted annual leave entitlement. Advisory letter may be issued."});
    else if(ab.abnormal) notifs.push({id:"abnormal",type:"warn",msg:"⚠️ Leave usage exceeds 75% of annual entitlement."});
    return notifs.filter(n=>!notifDismissed.includes(n.id));
  })():[];

  // ── Auth ──────────────────────────────────────────────────────
  function doLogin() {
    setLoginErr("");
    const emp=STAFF.find(s=>s.empNo===loginEmp.trim()||s.lastName.toLowerCase()===loginEmp.trim().toLowerCase()||s.fullName.toLowerCase().includes(loginEmp.trim().toLowerCase()));
    if(!emp){setLoginErr("Employee not found.");return;}
    const role=FIXED_ROLES[emp.empNo]||"staff";
    if(["director","registrar","leave_officer","ict_officer"].includes(role)){
      if(!loginPin){setLoginErr("Enter your PIN.");return;}
      if(loginPin!==(pins[emp.empNo]||"")){setLoginErr("Incorrect PIN.");return;}
    }
    setCurrentUser(emp); setUserRole(role); setTab("home"); setScreen("app");
  }
  function doLogout(){setCurrentUser(null);setUserRole(null);setScreen("login");setLoginEmp("");setLoginPin("");setLoginErr("");}
  function changePin(){if(newPin.length<4){alert("Minimum 4 digits.");return;}if(newPin!==confirmPin){alert("PINs don't match.");return;}setPins(p=>({...p,[currentUser.empNo]:newPin}));setNewPin("");setConfirmPin("");setPinModal(false);alert("PIN changed!");}

  // ── Leave actions ─────────────────────────────────────────────
  function submitLeave(e){
    e.preventDefault();
    if(!form.from||!form.to||!form.reason){setFormMsg({t:"error",m:"Fill all fields."});return;}
    const days=countWD(form.from,form.to);
    if(days<=0){setFormMsg({t:"error",m:"No working days in range."});return;}
    if(form.type==="Casual Leave"&&days>6){setFormMsg({t:"error",m:"Casual leave max 6 days at once."});return;}
    if(form.type==="Maternity Leave"&&currentUser.gender!=="Female"){setFormMsg({t:"error",m:"Maternity leave for female officers only."});return;}
    if(currentUser.staffGrade==="junior"&&getSvcYears(currentUser.joined)<1&&form.type==="Casual Leave"){setFormMsg({t:"error",m:"Junior staff: casual leave available only after 1 year of continuous service."});return;}
    const bal=myBalances.find(b=>b.type===form.type);
    if(bal&&bal.balance!=="∞"&&bal.balance<days){setFormMsg({t:"error",m:`Insufficient ${form.type}. Available: ${bal.balance} days.`});return;}
    const rec={id:Date.now(),type:form.type,from:form.from,to:form.to,days,reason:form.reason,status:"Pending",appliedOn:today(),approvedOn:"",approvedBy:"",medCertRequired:form.type==="Vacation/Sick Leave"||form.type==="Half Pay Leave",medCertReceived:false};
    setLeaveRecords(p=>({...p,[currentUser.empNo]:[...(p[currentUser.empNo]||[]),rec]}));
    setFormMsg({t:"success",m:`Submitted! ${days} day(s). Ref: ${today()}-${String(rec.id).slice(-4)}`});
    setForm(f=>({...f,from:"",to:"",reason:""}));
  }

  function canApprove(role, empNo) {
    const emp=STAFF.find(e=>e.empNo===empNo);
    if(role==="director") return true;
    // Registrar can approve Non Academic directly OR recommend Non Academic LO-recommended leaves
    if(role==="registrar") return emp?.section==="Non Academic";
    return false;
  }
  // Registrar sees: Non Academic at LO Recommended stage (to add their recommendation)
  // Registrar can also directly approve Non Academic at any stage
  function registrarCanRecommend(empNo, status) {
    const emp=STAFF.find(e=>e.empNo===empNo);
    return emp?.section==="Non Academic" && status==="LO Recommended";
  }

  function doApprove(empNo,id){
    setLeaveRecords(p=>({...p,[empNo]:p[empNo].map(r=>r.id===id?{...r,status:"Approved",approvedBy:userRole,approvedOn:today()}:r)}));
  }
  function doReject(empNo,id){setLeaveRecords(p=>({...p,[empNo]:p[empNo].map(r=>r.id===id?{...r,status:"Rejected"}:r)}));}
  function doRecommend(empNo,id,val,role){
    // Only Non Academic leaves go through LO → Registrar → Director chain
    // Academic leaves go directly to Director — no recommendation needed
    const emp=STAFF.find(e=>e.empNo===empNo);
    let newStatus;
    if(!val) newStatus="Not Recommended";
    else if(role==="leave_officer") newStatus="LO Recommended";
    else if(role==="registrar") newStatus="Reg Recommended";
    else newStatus="LO Recommended";
    setLeaveRecords(p=>({...p,[empNo]:p[empNo].map(r=>r.id===id?{...r,status:newStatus,recommendation:(val?"Recommended by "+(role==="leave_officer"?"Leave Officer":"Registrar"):"Not Recommended by "+(role==="leave_officer"?"Leave Officer":"Registrar"))}:r)}));
  }
  function markMedCert(empNo,id){setLeaveRecords(p=>({...p,[empNo]:p[empNo].map(r=>r.id===id?{...r,medCertReceived:true}:r)}));}

  // ── Attendance + Finger Scan ──────────────────────────────────
  function syncFingerScan(date) {
    const newScan={};
    STAFF.forEach(emp=>{
      if(!isWkendHol(date)){
        const rawTime=generateScanData(emp.empNo,date);
        newScan[emp.empNo]=rawTime;
        const hasApprovedLeave=(leaveRecords[emp.empNo]||[]).some(r=>r.status==="Approved"&&date>=r.from&&date<=r.to);
        if(!hasApprovedLeave){
          const classified=classifyScanIn(rawTime,emp);
          setAttendance(p=>({...p,[date]:{...(p[date]||{}),[emp.empNo]:classified}}));
        }
      }
    });
    setScanData(p=>({...p,[date]:newScan}));
    const scanned=Object.values(newScan).filter(Boolean).length;
    const lateCount=Object.entries(newScan).filter(([e,t])=>t&&timeCmp(t,LATE_GRACE)>0).length;
    const minorLateCount=Object.entries(newScan).filter(([e,t])=>t&&timeCmp(t,OFFICE_START)>0&&timeCmp(t,LATE_GRACE)<=0).length;
    alert(`Sync complete for ${date}.\n✓ ${scanned} scans recorded\n⏰ ${minorLateCount} minor late (≤09:00)\n🔴 ${lateCount} late (>09:00, must cover until 16:45)\n✗ ${STAFF.length-scanned} absent`);
  }

  function getAttStatus(empNo,date){
    const hasLeave=(leaveRecords[empNo]||[]).some(r=>r.status==="Approved"&&date>=r.from&&date<=r.to);
    if(hasLeave) return "on_leave";
    const d=attendance[date]?.[empNo];
    if(!d) return "";
    if(typeof d==="string") return d; // legacy
    return d.status||"";
  }

  function getAttDetail(empNo,date){
    const d=attendance[date]?.[empNo];
    if(!d||typeof d==="string") return null;
    return d;
  }

  function setAttStatus(empNo,date,statusOrObj){
    const obj=typeof statusOrObj==="string"?{status:statusOrObj}:statusOrObj;
    setAttendance(p=>({...p,[date]:{...(p[date]||{}),[empNo]:obj}}));
  }

  // Short leave management
  function grantShortLeave(empNo,date,type){
    const emp=STAFF.find(e=>e.empNo===empNo);
    const month=date.slice(0,7);
    const used=shortLeavesUsed(empNo,shortLeaveRecs,month);
    if(used>=SHORT_LEAVE_PER_MONTH){alert(`${emp?.fullName} has used all ${SHORT_LEAVE_PER_MONTH} short leaves for ${month}.`);return;}
    setShortLeaveRecs(p=>({...p,[empNo]:[...(p[empNo]||[]),{date,type,month,grantedBy:currentUser?.empNo,time:new Date().toISOString()}]}));
    alert(`Short leave (${type}) granted to ${emp?.fullName} for ${date}.\nWindow: ${shortLeaveWindow(type,emp)}\nUsed this month: ${used+1}/${SHORT_LEAVE_PER_MONTH}`);
  }

  function revokeShortLeave(empNo,date,type){
    setShortLeaveRecs(p=>({...p,[empNo]:(p[empNo]||[]).filter(r=>!(r.date===date&&r.type===type))}));
  }

  // Get minor late count for an employee this month
  function getMinorLates(empNo,month){
    let count=0;
    Object.entries(attendance).forEach(([date,dayData])=>{
      if(date.startsWith(month)){
        const d=dayData[empNo];
        if(d?.minorLate||d?.status==="minor_late") count++;
      }
    });
    return count;
  }

  // ── Chat ──────────────────────────────────────────────────────
  async function sendChat(){
    if(!chatInput.trim()||chatLoading)return;
    const msg=chatInput.trim();setChatInput("");setChatMsgs(p=>[...p,{role:"user",text:msg}]);setChatLoading(true);
    const balStr=myBalances.map(b=>`${b.type}: ${b.balance} left`).join("; ");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are the Leave Management AI for COT Ratnapura, DTET Sri Lanka. Expert on Establishments Code Ch.XII and PACs to 08/2025. Key rules: Officer casual=21/yr (calendar basis); Junior casual=0 first year, 21/yr after 1yr continuous service; Officer vacation=24/yr (appointment basis first 2yr); Junior sick=prorated first 9mo then 24/yr; Medical leave excludes weekends/holidays (PAC 18/2022); Casual max 6 days at once; Director approves all staff; Registrar approves non-academic only. ${currentUser?`User: ${currentUser.fullName} (${userRole}), ${currentUser.designation}, grade:${currentUser.staffGrade}, joined:${currentUser.joined}`:""}. ${myBalances.length?`Balances: ${balStr}`:""} Respond in English or Sinhala as asked.`,messages:[...chatMsgs.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text})),{role:"user",content:msg}]})}); const data=await res.json(); setChatMsgs(p=>[...p,{role:"assistant",text:data.content?.[0]?.text||"Error."}]);
    }catch{setChatMsgs(p=>[...p,{role:"assistant",text:"Connection error."}]);}
    setChatLoading(false);
  }

  // ═══════════════════════════════════════════════════════════════
  // MOBILE STYLES
  // ═══════════════════════════════════════════════════════════════
  const C={bg:"#f0f4f8",card:"#ffffff",border:"#dce3ea",text:"#1a2b3c",muted:"#64748b",accent:"#1565c0",success:"#1a6b3a",warn:"#92400e",danger:"#b91c1c",purple:"#4a148c"};
  const roleCol=ROLE_META[userRole]?.color||C.accent;
  const s={
    wrap:{minHeight:"100vh",minHeight:"100dvh",width:"100%",background:"#f0f4f8",fontFamily:"'Segoe UI',system-ui,sans-serif",color:C.text,paddingBottom:100,fontSize:16},
    card:{background:"#ffffff",border:"1px solid #dce3ea",borderRadius:14,padding:20,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.07)"},
    input:{width:"100%",background:"#ffffff",border:"1.5px solid #dce3ea",borderRadius:10,padding:"14px 16px",color:"#1a2b3c",fontSize:16,outline:"none",boxSizing:"border-box",fontFamily:"inherit"},
    select:{width:"100%",background:"#ffffff",border:"1.5px solid #dce3ea",borderRadius:10,padding:"14px 16px",color:"#1a2b3c",fontSize:16,outline:"none",boxSizing:"border-box"},
    btn:(v,full)=>({background:v==="primary"?"linear-gradient(135deg,#0369a1,#0ea5e9)":v==="success"?"linear-gradient(135deg,#15803d,#22c55e)":v==="danger"?"linear-gradient(135deg,#b91c1c,#ef4444)":v==="warn"?"linear-gradient(135deg,#b45309,#f59e0b)":v==="purple"?"linear-gradient(135deg,#6d28d9,#a78bfa)":v==="gold"?"linear-gradient(135deg,#92400e,#f59e0b)":"rgba(255,255,255,0.08)",border:"none",borderRadius:10,padding:full?"16px 0":"12px 20px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14,width:full?"100%":"auto",transition:"all .15s",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6}),
    label:{display:"block",fontSize:12,color:C.muted,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:.5},
    badge:(st)=>({display:"inline-block",padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:700,background:st==="Approved"?"#22c55e1a":st==="Rejected"?"#ef44441a":st==="Reg Recommended"?"#3b82f61a":st==="LO Recommended"?"#a78bfa1a":st==="Not Recommended"?"#ef444411":"#f59e0b1a",color:st==="Approved"?C.success:st==="Rejected"?C.danger:st==="Reg Recommended"?"#3b82f6":st==="LO Recommended"?C.purple:st==="Not Recommended"?C.danger:C.warn,border:`1px solid ${st==="Approved"?"#22c55e33":st==="Rejected"?"#ef444433":st==="Reg Recommended"?"#3b82f633":st==="LO Recommended"?"#a78bfa33":st==="Not Recommended"?"#ef444433":"#f59e0b33"}`}),
    alertBox:(t)=>({padding:"12px 14px",borderRadius:10,marginBottom:10,background:t==="error"?"#fde8e8":t==="success"?"#e8f5e9":"#fef9ec",border:`1px solid ${t==="error"?"#f5c2c2":t==="success"?"#a8d5b0":"#f0d060"}`,color:t==="error"?"#b91c1c":t==="success"?"#1a6b3a":"#92400e",fontSize:14,fontWeight:500}),
    attChip:(st)=>({display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"8px 14px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",background:st==="present"?"#e8f5e9":st==="absent"?"#fde8e8":st==="late"?"#fef9ec":st==="on_leave"?"#e3f2fd":"#f0f4f8",color:st==="present"?"#1a6b3a":st==="absent"?"#b91c1c":st==="late"?"#92400e":st==="on_leave"?"#1565c0":"#64748b",border:`1px solid ${st==="present"?"#a8d5b0":st==="absent"?"#f5c2c2":st==="late"?"#f0d060":st==="on_leave"?"#90caf9":"#dce3ea"}`,minWidth:70}),
    bottomNav:{position:"fixed",bottom:0,left:0,right:0,background:"#ffffff",borderTop:"2px solid #dce3ea",display:"flex",zIndex:200,boxShadow:"0 -2px 10px rgba(0,0,0,0.08)"},
    navItem:(active,col="#1565c0")=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"12px 4px 10px",cursor:"pointer",background:active?"#e8f0fe":"transparent",border:"none",color:active?col:"#64748b",fontSize:13,fontWeight:active?700:500,gap:4,borderTop:active?"3px solid "+col:"3px solid transparent"}),
    main:{maxWidth:1100,margin:"0 auto",padding:"16px 14px",width:"100%"},
    sectionChip:(sec)=>({fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:4,background:sec==="Academic"?"#e3f2fd":"#f3e8ff",color:sec==="Academic"?"#1565c0":"#4a148c"}),
  };

  // Modal
  const Modal = modal?(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:999,display:"flex",flexDirection:"column",padding:14}} onClick={()=>setModal(null)}>
      <div style={{background:"#ffffff",border:"1px solid #dce3ea",borderRadius:14,flex:1,overflow:"auto",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:"1px solid #dce3ea",position:"sticky",top:0,background:"#1a3a5c"}}>
          <div style={{fontWeight:700,fontSize:14,color:"#f1f5f9",flex:1}}>{modal.title}</div>
          <button style={{...s.btn("primary"),padding:"7px 12px",fontSize:12,marginLeft:8}} onClick={()=>{navigator.clipboard.writeText(modal.content).then(()=>alert("Copied!"));}}>📋</button>
          <button style={{...s.btn(""),padding:"7px 12px",fontSize:12,marginLeft:6}} onClick={()=>setModal(null)}>✕</button>
        </div>
        <pre style={{fontFamily:"'Courier New',monospace",fontSize:10,color:"#94a3b8",whiteSpace:"pre-wrap",padding:14,lineHeight:1.6,flex:1,overflow:"auto"}}>{modal.content}</pre>
      </div>
    </div>
  ):null;

  // PIN Modal
  const PinModal = pinModal?(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:16,background:"#f0f4f8"}}>
      <div style={{...s.card,width:"100%",maxWidth:340,padding:24}}>
        <div style={{fontWeight:700,marginBottom:16,fontSize:16}}>🔑 Change PIN</div>
        <label style={s.label}>New PIN</label>
        <input type="password" style={{...s.input,marginBottom:10,letterSpacing:8,fontSize:20,textAlign:"center"}} value={newPin} onChange={e=>setNewPin(e.target.value)} maxLength={8} placeholder="••••" />
        <label style={s.label}>Confirm PIN</label>
        <input type="password" style={{...s.input,marginBottom:16,letterSpacing:8,fontSize:20,textAlign:"center"}} value={confirmPin} onChange={e=>setConfirmPin(e.target.value)} maxLength={8} placeholder="••••" onKeyDown={e=>e.key==="Enter"&&changePin()} />
        <div style={{display:"flex",gap:8}}>
          <button style={{...s.btn("success"),flex:1,padding:"12px 0"}} onClick={changePin}>Save</button>
          <button style={{...s.btn(""),flex:1,padding:"12px 0"}} onClick={()=>setPinModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ):null;

  // ═══════════════════════════════════════════════════════════════
  // LOGIN
  // ═══════════════════════════════════════════════════════════════
  if(screen==="login"){
    const empMatch=STAFF.find(s=>s.empNo===loginEmp.trim()||s.fullName.toLowerCase().includes(loginEmp.trim().toLowerCase()));
    const needPin=empMatch&&FIXED_ROLES[empMatch.empNo];
    const empRole=empMatch?(FIXED_ROLES[empMatch.empNo]||"staff"):null;
    return(
      <div style={{...s.wrap,display:"flex",alignItems:"center",justifyContent:"center",paddingBottom:0}}>
        <div style={{width:"100%",maxWidth:480,padding:28}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{width:80,height:80,borderRadius:22,background:"linear-gradient(135deg,#0369a1,#38bdf8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 14px"}}>🏛️</div>
            <div style={{fontSize:22,fontWeight:800,color:"#f1f5f9"}}>COT Ratnapura</div>
            <div style={{fontSize:13,color:C.accent,fontWeight:600}}>Leave Management System</div>
            <div style={{fontSize:11,color:"#1e3a52",marginTop:6}}>Department of Technical Education and Training</div>
          </div>
          {loginErr&&<div style={s.alertBox("error")}>⚠️ {loginErr}</div>}
          {empMatch&&<div style={{...s.card,display:"flex",alignItems:"center",gap:12,marginBottom:12,borderColor:ROLE_META[empRole]?.color+"44"}}>
            <div style={{fontSize:28}}>{ROLE_META[empRole]?.icon}</div>
            <div><div style={{fontSize:14,fontWeight:700}}>{empMatch.fullName}</div><div style={{fontSize:11,color:C.muted}}>{empMatch.designation} · <span style={{color:ROLE_META[empRole]?.color,fontWeight:700}}>{ROLE_META[empRole]?.label}</span></div></div>
          </div>}
          <label style={s.label}>Employee Number or Name</label>
          <input style={{...s.input,marginBottom:12,fontSize:16}} value={loginEmp} onChange={e=>{setLoginEmp(e.target.value);setLoginErr("");}} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="e.g. 11004 or Kanthi" autoFocus />
          {needPin&&<>
            <label style={s.label}>PIN</label>
            <input type="password" style={{...s.input,marginBottom:12,letterSpacing:12,fontSize:24,textAlign:"center"}} value={loginPin} onChange={e=>setLoginPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} maxLength={8} placeholder="••••" />
          </>}
          <button style={{...s.btn("primary"),width:"100%",padding:"14px 0",fontSize:16}} onClick={doLogin}>Sign In →</button>
          <div style={{...s.card,marginTop:20,padding:14}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,fontWeight:700}}>Default PINs (change after first login)</div>
            {[{r:"Director",e:"11004",p:"1234"},{r:"Registrar",e:"250015",p:"5678"},{r:"Leave Officer",e:"20990",p:"1111"},{r:"ICT Officer",e:"255003",p:"2222"}].map(x=>(
              <div key={x.e} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#334155",padding:"2px 0"}}><span>{x.r} ({x.e})</span><span style={{fontFamily:"monospace",color:"#475569"}}>PIN: {x.p}</span></div>
            ))}
            <div style={{fontSize:10,color:"#1e3a52",marginTop:6}}>Staff members — no PIN required</div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // NAV CONFIGS PER ROLE
  // ═══════════════════════════════════════════════════════════════
  const navByRole = {
    staff:        [{k:"home",i:"🏠",l:"Home"},{k:"apply",i:"📝",l:"Apply"},{k:"records",i:"📋",l:"Records"},{k:"summary",i:"📊",l:"Summary"},{k:"chat",i:"🤖",l:"AI"}],
    leave_officer:[{k:"home",i:"🏠",l:"Home"},{k:"pending",i:"⏳",l:"Pending"},{k:"register",i:"📓",l:"Register"},{k:"reports",i:"📑",l:"Reports"},{k:"alerts",i:"🚨",l:"Alerts"}],
    registrar:    [{k:"home",i:"🏠",l:"Home"},{k:"approve",i:"✅",l:"Approve"},{k:"letters",i:"📄",l:"Letters"},{k:"summary",i:"📊",l:"Summary"},{k:"reports",i:"📑",l:"Reports"}],
    director:     [{k:"home",i:"🏠",l:"Home"},{k:"approve",i:"✅",l:"Approve"},{k:"reports",i:"📑",l:"Reports"},{k:"summary",i:"📊",l:"Summary"},{k:"settings",i:"⚙️",l:"Settings"}],
    ict_officer:  [{k:"home",i:"🏠",l:"Home"},{k:"attendance",i:"📅",l:"Attend."},{k:"scan",i:"🖐",l:"Scan"},{k:"monthly",i:"📊",l:"Monthly"},{k:"flags",i:"🚩",l:"Flags"}],
  };
  const navItems = navByRole[userRole]||navByRole.staff;

  // ─── SHARED CONTENT RENDERER ─────────────────────────────────
  const renderTab = () => {
    const svcBanner = currentUser&&svcMonths<12&&currentUser.staffGrade==="junior"?(
      <div style={{...s.alertBox("warn"),marginBottom:12}}>📌 Junior staff: Casual leave available after completing 1 year of service ({12-svcMonths} month(s) remaining).</div>
    ):null;

    // ── HOME ────────────────────────────────────────────────────
    if(tab==="home") return(
      <>
        <div style={{...s.card,background:"linear-gradient(135deg,#1a3a5c,#2e6da4)",borderColor:"#1a3a5c",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:19,fontWeight:800,color:"#ffffff"}}>👋 {currentUser.title} {currentUser.lastName}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",marginTop:2}}>{currentUser.designation}</div>
              <div style={{fontSize:11,color:C.muted}}>{currentUser.section} · Emp# {currentUser.empNo}</div>
              <div style={{marginTop:6,display:"flex",gap:6,flexWrap:"wrap"}}>
                <span style={{...s.sectionChip(currentUser.section)}}>{currentUser.section}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:ROLE_META[userRole]?.color+"22",color:ROLE_META[userRole]?.color}}>{ROLE_META[userRole]?.icon} {ROLE_META[userRole]?.label}</span>
                <span style={{fontSize:10,color:"#475569",padding:"1px 6px",borderRadius:4,background:"rgba(255,255,255,0.05)"}}>{getSvcYears(currentUser.joined)} yrs service</span>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:11,color:C.muted}}>Today</div>
              <div style={{fontSize:12,fontWeight:600,color:"#94a3b8"}}>{new Date().toLocaleDateString("en-LK",{day:"2-digit",month:"short",year:"numeric"})}</div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.map(n=>(
          <div key={n.id} style={{...s.alertBox(n.type==="danger"?"error":"warn"),display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <span style={{fontSize:13}}>{n.msg}</span>
            <button onClick={()=>setNotifDismissed(p=>[...p,n.id])} style={{background:"none",border:"none",color:"inherit",cursor:"pointer",fontSize:16,marginLeft:8,opacity:.7}}>×</button>
          </div>
        ))}

        {svcBanner}

        {/* Leave balance cards */}
        {userRole==="staff"&&<>
          <div style={{fontSize:12,color:C.muted,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Leave Balance {currYear}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginBottom:16}}>
            {myBalances.filter(b=>b.total>0||b.type==="Half Pay Leave").slice(0,4).map(b=>(
              <div key={b.type} style={{...s.card,borderColor:b.color+"33",background:b.color+"0a",padding:"14px 14px"}}>
                <div style={{fontSize:28,fontWeight:800,color:b.color,lineHeight:1}}>{b.balance}</div>
                <div style={{fontSize:10,color:"#94a3b8",marginTop:3}}>{b.icon} {b.type}</div>
                <div style={{background:"rgba(255,255,255,0.08)",borderRadius:999,height:3,marginTop:6,overflow:"hidden"}}>
                  <div style={{width:b.total>0?`${Math.min(100,(b.used/b.total)*100)}%`:"0%",background:b.color,height:"100%",borderRadius:999}}/>
                </div>
              </div>
            ))}
          </div>
        </>}

        {/* Role-specific home stats */}
        {(userRole==="director"||userRole==="registrar"||userRole==="leave_officer")&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
            {[{l:"All Pending",v:pending.length,c:C.warn,i:"⏳"},{l:"LO Rec.",v:loRecommended.length,c:C.purple,i:"📝"},{l:"Reg Rec.",v:regRecommended.length,c:"#3b82f6",i:"📋"},{l:"Approved",v:allLeaves.filter(r=>r.status==="Approved").length,c:C.success,i:"✅"}].map(st=>(
              <div key={st.l} style={{...s.card,borderColor:st.c+"33",background:st.c+"0a",padding:"14px 10px",textAlign:"center"}}>
                <div style={{fontSize:26,fontWeight:800,color:st.c}}>{st.v}</div>
                <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>{st.i} {st.l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Recent applications for staff */}
        {userRole==="staff"&&myLeaves.length>0&&<>
          <div style={{fontSize:12,color:C.muted,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Recent Applications</div>
          {[...myLeaves].reverse().slice(0,3).map(r=>(
            <div key={r.id} style={{...s.card,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px"}}>
              <div><div style={{fontSize:13,fontWeight:600}}>{r.type}</div><div style={{fontSize:11,color:C.muted}}>{fmtD(r.from)} → {fmtD(r.to)} · {r.days}d</div></div>
              <span style={s.badge(r.status)}>{r.status}</span>
            </div>
          ))}
        </>}
      </>
    );

    // ── APPLY ───────────────────────────────────────────────────
    if(tab==="apply") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📝 Apply for Leave</div>
        {formMsg&&<div style={s.alertBox(formMsg.t)}>{formMsg.t==="error"?"❌":"✅"} {formMsg.m}</div>}
        {svcBanner}
        <label style={s.label}>Leave Type</label>
        <select style={{...s.select,marginBottom:12}} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
          {["Casual Leave","Vacation/Sick Leave","Half Pay Leave","No Pay Leave","Maternity Leave","Special Leave","Study Leave (Local)"].map(t=><option key={t}>{t}</option>)}
        </select>
        {myBalances.filter(b=>b.type===form.type).map(b=>(
          b.total>0&&<div key={b.type} style={{background:b.color+"0f",border:`1px solid ${b.color}33`,borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"#94a3b8"}}>{b.icon} {b.type}</span>
            <span style={{fontSize:18,fontWeight:800,color:b.color}}>{b.balance} days left</span>
          </div>
        ))}
        {form.type==="Maternity Leave"&&currentUser.gender!=="Female"&&<div style={s.alertBox("error")}>❌ Maternity leave for female officers only.</div>}
        {form.type==="Vacation/Sick Leave"&&<div style={{...s.alertBox("warn"),marginBottom:10}}>🏥 Medical certificate required within 3 working days of leave commencement.</div>}
        {form.type==="Study Leave (Local)"&&<div style={{...s.alertBox("warn"),marginBottom:10}}>📚 Max 10 days, once per degree, for PG exam preparation only (PAC 23/2014).</div>}
        <label style={s.label}>From Date</label>
        <input type="date" style={{...s.input,marginBottom:12}} value={form.from} onChange={e=>setForm(f=>({...f,from:e.target.value}))} />
        <label style={s.label}>To Date</label>
        <input type="date" style={{...s.input,marginBottom:10}} value={form.to} onChange={e=>setForm(f=>({...f,to:e.target.value}))} />
        {form.from&&form.to&&<div style={{padding:"10px 14px",background:"rgba(56,189,248,0.08)",borderRadius:9,fontSize:13,color:C.accent,border:"1px solid rgba(56,189,248,0.2)",marginBottom:12}}>
          📅 Working days: <b>{countWD(form.from,form.to)}</b> — weekends & holidays excluded
          {form.type==="Casual Leave"&&countWD(form.from,form.to)>6&&<div style={{color:C.danger,marginTop:4,fontSize:12}}>⚠️ Exceeds 6-day casual leave limit</div>}
        </div>}
        <label style={s.label}>Reason *</label>
        <textarea style={{...s.input,minHeight:80,resize:"vertical",marginBottom:12}} value={form.reason} onChange={e=>setForm(f=>({...f,reason:e.target.value}))} placeholder="State reason clearly..." />
        <div style={{padding:"10px 14px",background:"rgba(255,255,255,0.02)",borderRadius:8,fontSize:11,color:"#334155",marginBottom:14}}>💡 Urgent absence? Inform Director by SMS/email/phone first, then submit this form (PAC 24/2013 s.1:5).</div>
        <button style={{...s.btn("primary"),width:"100%",padding:"14px 0",fontSize:15}} onClick={submitLeave}>Submit Application</button>
      </div>
    );

    // ── MY RECORDS ──────────────────────────────────────────────
    if(tab==="records") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📋 My Leave Records</div>
        {myLeaves.length===0?<div style={{...s.card,textAlign:"center",padding:40,color:C.muted}}>No records yet</div>:
        [...myLeaves].reverse().map(r=>(
          <div key={r.id} style={{...s.card,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{fontSize:15,fontWeight:700}}>{r.type}</div><div style={{fontSize:11,color:C.muted}}>{fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div><div style={{fontSize:10,color:"#334155",marginTop:2}}>{r.reason.substring(0,50)}</div></div>
              <span style={s.badge(r.status)}>{r.status}</span>
            </div>
            {r.medCertRequired&&!r.medCertReceived&&r.status==="Approved"&&<div style={{fontSize:11,color:C.danger,background:"#ef444415",padding:"4px 8px",borderRadius:6,marginBottom:6}}>⚠️ Medical certificate not yet submitted</div>}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button style={{...s.btn(""),padding:"6px 12px",fontSize:11}} onClick={()=>setModal({title:"Gen 125a",content:genForm125a(r,currentUser)})}>📄 125a</button>
              {r.status==="Approved"&&<button style={{...s.btn(""),padding:"6px 12px",fontSize:11}} onClick={()=>setModal({title:"Gen 190 Entry",content:genForm190Entry(r,currentUser)})}>📓 190</button>}
            </div>
          </div>
        ))}
      </div>
    );

    // ── LEAVE SUMMARY ────────────────────────────────────────────
    if(tab==="summary") {
      const canViewAll = ["director","registrar","leave_officer"].includes(userRole);
      const targetEmpNo = canViewAll?summaryEmp:currentUser.empNo;
      const targetEmp = STAFF.find(e=>e.empNo===targetEmpNo)||currentUser;
      const periods = {
        year:`${currYear}-01-01`, month:today().slice(0,7)+"-01",
        custom: summaryFrom,
      };
      const fromDate = summaryPeriod==="year"?`${currYear}-01-01`:summaryPeriod==="month"?today().slice(0,7)+"-01":summaryFrom;
      const toDate = summaryPeriod==="custom"?summaryTo:today();
      return(
        <div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📊 Leave Summary</div>
          {canViewAll&&<>
            <label style={s.label}>Select Staff Member</label>
            <select style={{...s.select,marginBottom:12}} value={summaryEmp} onChange={e=>setSummaryEmp(e.target.value)}>
              <option value="">— Select staff member —</option>
              {STAFF.filter(e=>userRole==="registrar"?e.section==="Non Academic":true).map(e=><option key={e.empNo} value={e.empNo}>{e.fullName} ({e.empNo})</option>)}
            </select>
          </>}
          <label style={s.label}>Period</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
            {["year","month","custom"].map(p=>(
              <button key={p} style={{...s.btn(summaryPeriod===p?"primary":""),padding:"10px 0",fontSize:13}} onClick={()=>setSummaryPeriod(p)}>{p==="year"?"This Year":p==="month"?"This Month":"Custom"}</button>
            ))}
          </div>
          {summaryPeriod==="custom"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div><label style={s.label}>From</label><input type="date" style={s.input} value={summaryFrom} onChange={e=>setSummaryFrom(e.target.value)} /></div>
            <div><label style={s.label}>To</label><input type="date" style={s.input} value={summaryTo} onChange={e=>setSummaryTo(e.target.value)} /></div>
          </div>}
          {targetEmp&&<>
            {/* Balance cards */}
            <div style={{fontSize:12,color:C.muted,fontWeight:700,marginBottom:8}}>Balance for {currYear}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {getLeaveBalance(targetEmp,leaveRecords,currYear).filter(b=>b.total>0).map(b=>(
                <div key={b.type} style={{...s.card,borderColor:b.color+"33",background:b.color+"0a",padding:"12px 12px"}}>
                  <div style={{fontSize:24,fontWeight:800,color:b.color}}>{b.balance}</div>
                  <div style={{fontSize:10,color:"#94a3b8"}}>{b.icon} {b.type}</div>
                  <div style={{fontSize:10,color:"#334155"}}>{b.used} used / {b.total} total</div>
                </div>
              ))}
            </div>
            <button style={{...s.btn("primary"),width:"100%",padding:"12px 0",marginBottom:10}} onClick={()=>setModal({title:`Leave Summary — ${targetEmp.fullName}`,content:genLeaveSummary(targetEmp,leaveRecords,fromDate,toDate,summaryPeriod==="year"?`Year ${currYear}`:summaryPeriod==="month"?`Month ${today().slice(0,7)}`:`${summaryFrom} to ${summaryTo}`)})}>
              📊 Generate Full Summary Report
            </button>
          </>}
        </div>
      );
    }

    // ── AI CHAT ──────────────────────────────────────────────────
    if(tab==="chat") return(
      <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:10}}>🤖 AI Leave Assistant</div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,paddingBottom:10}}>
          {chatMsgs.length===0&&<div style={{...s.card,textAlign:"center",padding:30,color:C.muted,fontSize:12}}>Ask about leave rules, your balance, or any circular.<br/><span style={{color:"#1e3a52"}}>Responds in English or Sinhala.</span></div>}
          {chatMsgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?"#1565c0":"#f0f4f8",fontSize:13,lineHeight:1.6,color:C.text,whiteSpace:"pre-wrap"}}>{m.text}</div></div>)}
          {chatLoading&&<div style={{color:C.muted,fontSize:12,textAlign:"center"}}>Thinking…</div>}
          <div ref={chatEnd}/>
        </div>
        <div style={{display:"flex",gap:8,paddingTop:8,borderTop:"1px solid #dce3ea"}}>
          <input style={{...s.input,flex:1,fontSize:14}} value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendChat()} placeholder="Ask about leave…" />
          <button style={{...s.btn("primary"),padding:"12px 16px"}} onClick={sendChat}>➤</button>
        </div>
      </div>
    );

    // ── PENDING (Leave Officer) — Non Academic only ───────────────
    if(tab==="pending") {
      const naPending=pending.filter(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return emp?.section==="Non Academic";});
      const acPending=pending.filter(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return emp?.section!=="Non Academic";});
      return(
        <div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:10}}>⏳ Pending Applications</div>
          <div style={{...s.alertBox("warn"),fontSize:11,marginBottom:12}}>
            📋 <b>Your Role:</b> Recommend Non Academic staff leave only.<br/>
            Academic staff go directly to the Director — no action needed from you.
          </div>
          {acPending.length>0&&<div style={{...s.card,padding:"10px 13px",marginBottom:10,borderLeft:"3px solid #64748b",background:"rgba(255,255,255,0.02)"}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,marginBottom:4}}>Academic Staff — {acPending.length} pending (goes directly to Director)</div>
            {acPending.map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return(
              <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                <div><div style={{fontSize:12,color:C.muted}}>{emp?.fullName}</div><div style={{fontSize:10,color:"#334155"}}>{r.type} · {r.days}d</div></div>
                <span style={{fontSize:10,color:C.muted}}>Director only</span>
              </div>
            );})}
          </div>}
          <div style={{fontSize:11,fontWeight:700,color:"#a78bfa",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Non Academic — Requires Your Recommendation</div>
          {naPending.length===0?<div style={{...s.card,textAlign:"center",padding:30,color:C.muted,fontSize:12}}>No Non Academic applications pending</div>:
          naPending.map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return(
            <div key={r.id} style={{...s.card,borderLeft:"3px solid #a78bfa"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp?.designation}</div></div>
                <span style={s.badge(r.status)}>{r.status}</span>
              </div>
              <div style={{fontSize:10,color:"#a78bfa",marginBottom:6}}>After your recommendation → Registrar recommends → Director approves</div>
              <div style={{fontSize:12,marginBottom:6}}><b>{r.type}</b> · {fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div>
              <div style={{fontSize:11,color:"#475569",marginBottom:10}}>{r.reason}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <button style={{...s.btn("success"),padding:"8px 14px",fontSize:12}} onClick={()=>doRecommend(r.empNo,r.id,true,"leave_officer")}>✓ Recommend</button>
                <button style={{...s.btn("danger"),padding:"8px 14px",fontSize:12}} onClick={()=>doRecommend(r.empNo,r.id,false,"leave_officer")}>✗ Not Rec.</button>
                <button style={{...s.btn(""),padding:"7px 10px",fontSize:11}} onClick={()=>setModal({title:"Gen 125a",content:genForm125a(r,emp)})}>📄</button>
                <button style={{...s.btn(""),padding:"7px 10px",fontSize:11}} onClick={()=>setModal({title:"Gen 190",content:genForm190Entry(r,emp)})}>📓</button>
              </div>
            </div>
          );})}
        </div>
      );
    }

    // ── LEAVE REGISTER (Leave Officer) ───────────────────────────
    if(tab==="register") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📓 Leave Register (Gen 190)</div>
        <label style={s.label}>Month</label>
        <input type="month" style={{...s.input,marginBottom:12}} value={reportMonth} onChange={e=>setReportMonth(e.target.value)} />
        <button style={{...s.btn("purple"),width:"100%",padding:"12px 0",marginBottom:12}} onClick={()=>setModal({title:`Gen 190 — ${reportMonth}`,content:genMonthlyGen190(leaveRecords,reportMonth)})}>
          📓 Generate Monthly Gen 190 Report
        </button>
        {allLeaves.filter(r=>r.status==="Approved"&&r.from.startsWith(reportMonth)).map(r=>{
          const emp=STAFF.find(e=>e.empNo===r.empNo);
          return <div key={r.id} style={{...s.card,padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div><div style={{fontSize:12,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:10,color:C.muted}}>{r.type} · {r.days} days</div></div>
              {r.medCertRequired&&<div style={{display:"flex",gap:6}}>
                {r.medCertReceived?<span style={{fontSize:10,color:C.success}}>✅ Cert</span>:<button style={{...s.btn("warn"),padding:"4px 8px",fontSize:10}} onClick={()=>markMedCert(r.empNo,r.id)}>Mark Cert ✓</button>}
              </div>}
            </div>
            <button style={{...s.btn(""),padding:"5px 10px",fontSize:10}} onClick={()=>setModal({title:`Gen 190 — ${emp?.fullName}`,content:genForm190Entry(r,emp)})}>📓 190</button>
          </div>;
        })}
      </div>
    );

    // ── ALERTS (Leave Officer) ───────────────────────────────────
    if(tab==="alerts") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>🚨 Alerts & Notifications</div>
        {/* Medical cert overdue */}
        <div style={{fontSize:12,color:C.warn,fontWeight:700,marginBottom:8,textTransform:"uppercase"}}>⏰ Medical Certificate Overdue</div>
        {STAFF.map(emp=>{const od=medCertOverdue(emp,leaveRecords); return od.length>0?(
          <div key={emp.empNo} style={{...s.card,borderColor:"#ef444433",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{emp.fullName}</div>
            {od.map(r=><div key={r.id} style={{fontSize:11,color:C.muted,marginBottom:4}}>{r.type} · {fmtD(r.from)} → {fmtD(r.to)} · Applied: {r.appliedOn}</div>)}
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <button style={{...s.btn("warn"),padding:"7px 12px",fontSize:11}} onClick={()=>setModal({title:`Med Cert Reminder — ${emp.fullName}`,content:genMedCertReminder(emp,od)})}>📨 Reminder Letter</button>
              {od.map(r=><button key={r.id} style={{...s.btn("success"),padding:"7px 12px",fontSize:11}} onClick={()=>markMedCert(emp.empNo,r.id)}>✓ Mark Received</button>)}
            </div>
          </div>
        ):null;})}

        {/* Abnormal leave */}
        <div style={{fontSize:12,color:C.danger,fontWeight:700,marginBottom:8,marginTop:16,textTransform:"uppercase"}}>🚨 Abnormal Leave Usage ({currYear})</div>
        {STAFF.map(emp=>{const ab=isAbnormal(emp,leaveRecords); return (ab.abnormal||ab.severe)?(
          <div key={emp.empNo} style={{...s.card,borderColor:ab.severe?"#ef444433":"#f59e0b33",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div><div style={{fontSize:13,fontWeight:700}}>{emp.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp.designation}</div></div>
              <span style={{fontSize:11,fontWeight:700,color:ab.severe?C.danger:C.warn,background:ab.severe?"#ef444418":"#f59e0b18",padding:"2px 8px",borderRadius:6}}>{ab.severe?"EXHAUSTED":"HIGH"}</span>
            </div>
            <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>Casual: {ab.cas} used · Vacation: {ab.vac} used</div>
            <button style={{...s.btn(ab.severe?"danger":"warn"),padding:"8px 14px",fontSize:12}} onClick={()=>setModal({title:`Advisory Letter — ${emp.fullName}`,content:genAbnormalLetter(emp,leaveRecords)})}>📨 Advisory Letter</button>
          </div>
        ):null;})}

        {STAFF.every(emp=>!isAbnormal(emp,leaveRecords).abnormal)&&STAFF.every(emp=>medCertOverdue(emp,leaveRecords).length===0)&&
          <div style={{...s.card,textAlign:"center",padding:30,color:C.success}}>✅ No alerts at this time</div>}
      </div>
    );

    // ── APPROVE (Director + Registrar) ───────────────────────────
    if(tab==="approve") {
      // Registrar sees two sections:
      //   1. Non Academic at "LO Recommended" → Registrar recommends/not recommends
      //   2. Non Academic at any stage → Registrar can approve directly
      const regToRecommend = loRecommended.filter(r=>registrarCanRecommend(r.empNo,r.status));
      const regCanApprove  = [...pending,...loRecommended,...regRecommended].filter(r=>canApprove(userRole,r.empNo));
      const dirCanApprove  = [...pending,...loRecommended,...regRecommended].filter(r=>canApprove(userRole,r.empNo));
      return(
        <div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:10}}>✅ {userRole==="registrar"?"Registrar Panel":"Director Approval"}</div>

          {userRole==="registrar"&&<>
            {/* Section A: Registrar recommends Non Academic LO-recommended leaves */}
            {regToRecommend.length>0&&<>
              <div style={{fontSize:11,fontWeight:700,color:"#a78bfa",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>
                📝 Awaiting Your Recommendation (Non Academic — LO already recommended)
              </div>
              {regToRecommend.map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo); return(
                <div key={r.id} style={{...s.card,borderLeft:"3px solid #a78bfa"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp?.designation}</div></div>
                    <span style={s.badge(r.status)}>{r.status}</span>
                  </div>
                  <div style={{fontSize:10,background:"rgba(167,139,250,0.1)",borderRadius:6,padding:"4px 8px",marginBottom:8,color:"#a78bfa"}}>Leave Officer has recommended · Your recommendation goes to Director for final approval</div>
                  <div style={{fontSize:12,marginBottom:6}}><b>{r.type}</b> · {fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div>
                  <div style={{fontSize:11,color:"#475569",marginBottom:10}}>{r.reason}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <button style={{...s.btn("success"),padding:"8px 14px",fontSize:12}} onClick={()=>doRecommend(r.empNo,r.id,true,"registrar")}>✓ Recommend to Director</button>
                    <button style={{...s.btn("danger"),padding:"8px 14px",fontSize:12}} onClick={()=>doRecommend(r.empNo,r.id,false,"registrar")}>✗ Not Recommend</button>
                    <button style={{...s.btn("primary"),padding:"8px 14px",fontSize:12}} onClick={()=>doApprove(r.empNo,r.id)}>⚡ Approve Directly</button>
                    <button style={{...s.btn(""),padding:"7px 10px",fontSize:11}} onClick={()=>setModal({title:"125a",content:genForm125a(r,emp)})}>📄</button>
                  </div>
                </div>
              );})}
              <div style={{height:1,background:"rgba(255,255,255,0.08)",margin:"12px 0"}}/>
            </>}

            {/* Section B: All Non Academic leaves Registrar can approve directly */}
            <div style={{fontSize:11,fontWeight:700,color:C.accent,marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>
              ✅ Direct Approval — Non Academic Staff
            </div>
            <div style={{...s.alertBox("warn"),marginBottom:10,fontSize:11}}>You can approve Non Academic staff directly at any stage. Academic staff require Director approval.</div>
            {regCanApprove.filter(r=>!regToRecommend.find(x=>x.id===r.id)).length===0&&regToRecommend.length===0?
              <div style={{...s.card,textAlign:"center",padding:30,color:C.muted}}>No Non Academic applications pending</div>:
              regCanApprove.filter(r=>!regToRecommend.find(x=>x.id===r.id)).map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo); return(
                <div key={r.id} style={{...s.card,borderColor:r.status==="Reg Recommended"?"#3b82f633":C.border}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp?.designation}</div></div>
                    <span style={s.badge(r.status)}>{r.status}</span>
                  </div>
                  <div style={{fontSize:12,marginBottom:6}}><b>{r.type}</b> · {fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div>
                  <div style={{fontSize:11,color:"#475569",marginBottom:10}}>{r.reason}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <button style={{...s.btn("success"),padding:"10px 16px",fontSize:13}} onClick={()=>doApprove(r.empNo,r.id)}>✓ Approve</button>
                    <button style={{...s.btn("danger"),padding:"10px 16px",fontSize:13}} onClick={()=>doReject(r.empNo,r.id)}>✗ Reject</button>
                    <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"125a",content:genForm125a(r,emp)})}>📄</button>
                    <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"190",content:genForm190Entry(r,emp)})}>📓</button>
                  </div>
                </div>
              );})}
          </>}

          {userRole==="director"&&<>
            {/* Academic — direct approval, no recommendation needed */}
            {(()=>{
              const acApps=[...pending,...loRecommended,...regRecommended].filter(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return emp?.section!=="Non Academic";});
              const naApps=[...pending,...loRecommended,...regRecommended].filter(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return emp?.section==="Non Academic";});
              return(<>
                <div style={{fontSize:11,fontWeight:700,color:C.success,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Academic Staff — Direct Approval</div>
                <div style={{...s.alertBox("warn"),fontSize:11,marginBottom:10}}>Academic staff leave does not require Leave Officer or Registrar recommendation. You approve directly.</div>
                {acApps.length===0?<div style={{...s.card,textAlign:"center",padding:20,color:C.muted,fontSize:12,marginBottom:12}}>No academic applications pending</div>:
                acApps.map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return(
                  <div key={r.id} style={{...s.card,borderLeft:"3px solid #22c55e",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp?.designation} · <span style={s.sectionChip("Academic")}>Academic</span></div></div>
                      <span style={s.badge(r.status)}>{r.status}</span>
                    </div>
                    <div style={{fontSize:12,marginBottom:6}}><b>{r.type}</b> · {fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div>
                    <div style={{fontSize:11,color:"#475569",marginBottom:10}}>{r.reason}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <button style={{...s.btn("success"),padding:"10px 16px",fontSize:13}} onClick={()=>doApprove(r.empNo,r.id)}>✓ Approve</button>
                      <button style={{...s.btn("danger"),padding:"10px 16px",fontSize:13}} onClick={()=>doReject(r.empNo,r.id)}>✗ Reject</button>
                      <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"125a",content:genForm125a(r,emp)})}>📄</button>
                      <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"190",content:genForm190Entry(r,emp)})}>📓</button>
                    </div>
                  </div>
                );})}
                <div style={{height:1,background:"rgba(255,255,255,0.08)",margin:"12px 0"}}/>
                {/* Non Academic — after LO + Registrar recommendations */}
                <div style={{fontSize:11,fontWeight:700,color:"#a78bfa",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Non Academic Staff — After LO &amp; Registrar Recommendation</div>
                <div style={{...s.alertBox("warn"),fontSize:11,marginBottom:10}}>Non Academic leave flows through Leave Officer then Registrar before reaching you. You can also approve at any stage.</div>
                {naApps.length===0?<div style={{...s.card,textAlign:"center",padding:20,color:C.muted,fontSize:12}}>No non-academic applications pending</div>:
                naApps.map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo);return(
                  <div key={r.id} style={{...s.card,borderLeft:r.status==="Reg Recommended"?"3px solid #3b82f6":r.status==="LO Recommended"?"3px solid #a78bfa":"3px solid #f59e0b",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{emp?.designation} · <span style={s.sectionChip("Non Academic")}>Non Academic</span></div></div>
                      <span style={s.badge(r.status)}>{r.status}</span>
                    </div>
                    {r.recommendation&&<div style={{fontSize:10,color:"#94a3b8",marginBottom:5,fontStyle:"italic"}}>📝 {r.recommendation}</div>}
                    <div style={{fontSize:12,marginBottom:6}}><b>{r.type}</b> · {fmtD(r.from)} → {fmtD(r.to)} · <b>{r.days}</b> days</div>
                    <div style={{fontSize:11,color:"#475569",marginBottom:10}}>{r.reason}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <button style={{...s.btn("success"),padding:"10px 16px",fontSize:13}} onClick={()=>doApprove(r.empNo,r.id)}>✓ Approve</button>
                      <button style={{...s.btn("danger"),padding:"10px 16px",fontSize:13}} onClick={()=>doReject(r.empNo,r.id)}>✗ Reject</button>
                      <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"125a",content:genForm125a(r,emp)})}>📄</button>
                      <button style={{...s.btn(""),padding:"8px 12px",fontSize:11}} onClick={()=>setModal({title:"190",content:genForm190Entry(r,emp)})}>📓</button>
                    </div>
                  </div>
                );})}
              </>);
            })()}
          </>}
        </div>
      );
    }

    // ── REPORTS ──────────────────────────────────────────────────
    if(tab==="reports") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📑 Reports & Letters</div>

        {/* ── Gen 190 Monthly Report ── */}
        <div style={{...s.cardNavy,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontSize:12,color:T.gold,fontWeight:700,marginBottom:8}}>📓 Monthly Leave Register — Gen 190</div>
          <label style={{...s.label,color:T.blueLt}}>Select Month</label>
          <input type="month" style={{...s.input,marginBottom:10}} value={reportMonth} onChange={e=>setReportMonth(e.target.value)} />
          <button style={{...s.btn("navy"),width:"100%",padding:"11px 0"}} onClick={()=>setModal({title:`Gen 190 — ${reportMonth}`,content:genMonthlyGen190(leaveRecords,reportMonth)})}>
            📓 Generate Gen 190 Report
          </button>
        </div>

        {/* ── Leave Summary per staff ── */}
        <div style={{...s.cardNavy,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontSize:12,color:T.gold,fontWeight:700,marginBottom:8}}>📊 Leave Summary — Any Staff Member</div>
          <label style={{...s.label,color:T.blueLt}}>Staff Member</label>
          <select style={{...s.select,marginBottom:8}} value={summaryEmp} onChange={e=>setSummaryEmp(e.target.value)}>
            <option value="">— Select staff member —</option>
            {STAFF.filter(e=>userRole==="registrar"?e.section==="Non Academic":true).map(e=><option key={e.empNo} value={e.empNo}>{e.fullName} ({e.empNo})</option>)}
          </select>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
            {["year","month","custom"].map(p=><button key={p} style={{...s.btn(summaryPeriod===p?"gold":"outline"),padding:"8px 0",fontSize:11}} onClick={()=>setSummaryPeriod(p)}>{p==="year"?"This Year":p==="month"?"This Month":"Custom"}</button>)}
          </div>
          {summaryPeriod==="custom"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div><label style={{...s.label,color:T.blueLt}}>From</label><input type="date" style={s.input} value={summaryFrom} onChange={e=>setSummaryFrom(e.target.value)} /></div>
            <div><label style={{...s.label,color:T.blueLt}}>To</label><input type="date" style={s.input} value={summaryTo} onChange={e=>setSummaryTo(e.target.value)} /></div>
          </div>}
          {summaryEmp&&<button style={{...s.btn("navy"),width:"100%",padding:"11px 0"}} onClick={()=>{
            const emp=STAFF.find(e=>e.empNo===summaryEmp);
            if(!emp) return;
            const from=summaryPeriod==="year"?`${currYear}-01-01`:summaryPeriod==="month"?today().slice(0,7)+"-01":summaryFrom;
            const to=summaryPeriod==="custom"?summaryTo:today();
            const label=summaryPeriod==="year"?`Year ${currYear}`:summaryPeriod==="month"?`Month ${today().slice(0,7)}`:`${summaryFrom} to ${summaryTo}`;
            setModal({title:`Leave Summary — ${emp.fullName}`,content:genLeaveSummary(emp,leaveRecords,from,to,label)});
          }}>📊 Generate Summary Report</button>}
        </div>

        {/* ── DTET Letters ── */}
        <div style={{...s.sectionTitle}}>📄 DTET Department Letters</div>
        {STAFF.filter(e=>userRole==="registrar"?e.section==="Non Academic":true).map(e=>(
          <div key={e.empNo} style={{...s.card,marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:"#1a3a5c"}}>{e.fullName}</div>
                <div style={{fontSize:10,color:T.textMuted}}>{e.designation} · {e.section}</div>
              </div>
              <button style={{...s.btn("navy"),padding:"7px 12px",fontSize:11}} onClick={()=>setModal({title:`DTET — ${e.fullName}`,content:genDTETLetter(e,leaveRecords)})}>📄 DTET</button>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {isAbnormal(e,leaveRecords).abnormal&&(
                <button style={{...s.btn("danger"),padding:"5px 10px",fontSize:10}} onClick={()=>setModal({title:`Advisory — ${e.fullName}`,content:genAbnormalLetter(e,leaveRecords)})}>🚨 Advisory Letter</button>
              )}
              {medCertOverdue(e,leaveRecords).length>0&&(
                <button style={{...s.btn("warn"),padding:"5px 10px",fontSize:10}} onClick={()=>setModal({title:`Med Reminder — ${e.fullName}`,content:genMedCertReminder(e,medCertOverdue(e,leaveRecords))})}>🏥 Med Reminder</button>
              )}
            </div>
          </div>
        ))}
      </div>
    );

    // ── LETTERS (Registrar) ──────────────────────────────────────
    if(tab==="letters") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>📄 Letters & Documents</div>
        {STAFF.filter(e=>e.section==="Non Academic").map(e=>(
          <div key={e.empNo} style={{...s.card,marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{e.fullName}</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{e.designation}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button style={{...s.btn("primary"),padding:"7px 12px",fontSize:11}} onClick={()=>setModal({title:`DTET Letter`,content:genDTETLetter(e,leaveRecords)})}>📄 DTET</button>
              {isAbnormal(e,leaveRecords).abnormal&&<button style={{...s.btn("danger"),padding:"7px 12px",fontSize:11}} onClick={()=>setModal({title:`Advisory`,content:genAbnormalLetter(e,leaveRecords)})}>🚨 Advisory</button>}
              {medCertOverdue(e,leaveRecords).length>0&&<button style={{...s.btn("warn"),padding:"7px 12px",fontSize:11}} onClick={()=>setModal({title:`Med Cert`,content:genMedCertReminder(e,medCertOverdue(e,leaveRecords))})}>🏥 Reminder</button>}
            </div>
          </div>
        ))}
      </div>
    );

    // ── DIRECTOR SETTINGS ────────────────────────────────────────
    if(tab==="settings") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>⚙️ Settings & Admin</div>
        <div style={{fontSize:12,color:C.muted,fontWeight:700,marginBottom:10,textTransform:"uppercase"}}>PIN Management</div>
        {Object.entries(FIXED_ROLES).map(([empNo,role])=>{
          const emp=STAFF.find(e=>e.empNo===empNo);
          return <div key={empNo} style={{...s.card,borderColor:ROLE_META[role]?.color+"33",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:22}}>{ROLE_META[role]?.icon}</div>
              <div><div style={{fontSize:13,fontWeight:700}}>{emp?.fullName}</div><div style={{fontSize:11,color:C.muted}}>{ROLE_META[role]?.label} · {empNo}</div></div>
            </div>
            {empNo===currentUser.empNo?<div style={{fontSize:11,color:C.muted}}>Use 🔑 button in header to change your own PIN.</div>:
            <div style={{display:"flex",gap:8}}>
              <input type="password" placeholder="New PIN" style={{...s.input,flex:1,letterSpacing:6,fontSize:16}} value={resetTarget===empNo?resetVal:""} onChange={e=>{setResetTarget(empNo);setResetVal(e.target.value);}} maxLength={8} />
              <button style={{...s.btn("warn"),padding:"12px 16px"}} onClick={()=>{if(!resetVal||resetVal.length<4){alert("Min 4 digits.");return;}setPins(p=>({...p,[empNo]:resetVal}));setResetTarget("");setResetVal("");alert(`PIN reset for ${emp?.fullName}!`);}}>Reset</button>
            </div>}
          </div>;
        })}
        <div style={{fontSize:12,color:C.muted,fontWeight:700,marginBottom:10,marginTop:16,textTransform:"uppercase"}}>All Leave Records</div>
        {allLeaves.length===0?<div style={{...s.card,textAlign:"center",padding:30,color:C.muted}}>No records</div>:
        [...allLeaves].reverse().slice(0,20).map(r=>{const emp=STAFF.find(e=>e.empNo===r.empNo); return(
          <div key={r.id} style={{...s.card,padding:"10px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:12,fontWeight:600}}>{emp?.fullName}</div><div style={{fontSize:10,color:C.muted}}>{r.type} · {r.days}d · {fmtD(r.from)}</div></div>
            <span style={s.badge(r.status)}>{r.status}</span>
          </div>
        );})}
      </div>
    );

    // ── ATTENDANCE (ICT) ─────────────────────────────────────────
    if(tab==="attendance") {
      const attStats = {
        present:  STAFF.filter(e=>getAttStatus(e.empNo,attDate)==="present").length,
        minor:    STAFF.filter(e=>getAttStatus(e.empNo,attDate)==="minor_late").length,
        late:     STAFF.filter(e=>getAttStatus(e.empNo,attDate)==="late").length,
        absent:   STAFF.filter(e=>getAttStatus(e.empNo,attDate)==="absent").length,
        onLeave:  STAFF.filter(e=>getAttStatus(e.empNo,attDate)==="on_leave").length,
        noMark:   STAFF.filter(e=>!getAttStatus(e.empNo,attDate)).length,
      };
      return(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:16,fontWeight:700}}>📅 Attendance</div>
            <input type="date" style={{...s.input,width:150,fontSize:13,padding:"8px 10px"}} value={attDate} onChange={e=>setAttDate(e.target.value)} />
          </div>
          {isWkendHol(attDate)&&<div style={s.alertBox("warn")}>⚠️ Weekend/Public Holiday — no attendance required.</div>}
          {/* Rules reminder */}
          <div style={{...s.card,background:"rgba(56,189,248,0.04)",borderColor:"rgba(56,189,248,0.15)",padding:"10px 12px",marginBottom:12}}>
            <div style={{fontSize:11,color:C.accent,fontWeight:700,marginBottom:4}}>📋 Time Rules</div>
            <div style={{fontSize:11,color:"#64748b",lineHeight:1.8}}>
              ✅ <b>Present:</b> Scan ≤ 08:30 &nbsp;|&nbsp; ⏱ <b>Minor Late:</b> 08:31–09:00 (2 forgiven/month)<br/>
              🔴 <b>Late:</b> After 09:00 → must stay until <b>16:45</b> to cover<br/>
              🌅 <b>Short Leave AM:</b> 08:30–10:00 &nbsp;|&nbsp; 🌇 <b>Short Leave PM:</b> Officer: 14:45–16:15 · Junior: 15:00–16:15<br/>
              📅 <b>Short leave quota:</b> 2 per month (all staff)
            </div>
          </div>
          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:12}}>
            {[{l:"Present",v:attStats.present,c:C.success},{l:"Minor Late",v:attStats.minor,c:"#84cc16"},{l:"Late (>9)",v:attStats.late,c:C.warn},{l:"Absent",v:attStats.absent,c:C.danger},{l:"On Leave",v:attStats.onLeave,c:C.accent},{l:"Not Marked",v:attStats.noMark,c:C.muted}].map(st=>(
              <div key={st.l} style={{background:st.c+"14",border:`1px solid ${st.c}22`,borderRadius:8,padding:"8px 4px",textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:800,color:st.c}}>{st.v}</div>
                <div style={{fontSize:9,color:"#94a3b8"}}>{st.l}</div>
              </div>
            ))}
          </div>
          {STAFF.map(emp=>{
            const st=getAttStatus(emp.empNo,attDate);
            const detail=getAttDetail(emp.empNo,attDate);
            const scanTime=scanData[attDate]?.[emp.empNo];
            const isOnLeave=st==="on_leave";
            const isMinorLate=st==="minor_late";
            const isLate=st==="late";
            const monthNow=attDate.slice(0,7);
            const minorLates=getMinorLates(emp.empNo,monthNow);
            const shortUsed=shortLeavesUsed(emp.empNo,shortLeaveRecs,monthNow);
            const todayShorts=(shortLeaveRecs[emp.empNo]||[]).filter(r=>r.date===attDate);
            const hasMorningShort=todayShorts.some(r=>r.type==="morning");
            const hasEveShort=todayShorts.some(r=>r.type==="evening");
            const chipColor=st==="present"?C.success:st==="minor_late"?"#84cc16":st==="late"?C.warn:st==="absent"?C.danger:st==="on_leave"?C.accent:C.muted;
            return <div key={emp.empNo} style={{...s.card,padding:"10px 12px",marginBottom:6,opacity:isOnLeave?0.65:1,borderColor:isLate?"#f59e0b22":isMinorLate?"#84cc1622":C.border}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700}}>{emp.fullName}</div>
                  <div style={{fontSize:10,color:C.muted,marginBottom:2}}>{emp.designation} · <span style={{color:emp.staffGrade==="junior"?"#f59e0b":"#38bdf8"}}>{emp.staffGrade}</span></div>
                  {scanTime&&<div style={{fontSize:10,color:C.accent}}>🖐 Scan: {scanTime}</div>}
                  {isLate&&detail?.coverUntil&&<div style={{fontSize:10,color:C.warn,fontWeight:700}}>⏰ Must cover until {detail.coverUntil}</div>}
                  {isMinorLate&&<div style={{fontSize:10,color:"#84cc16"}}>Minor late #{minorLates} this month {minorLates%2===0?"(pair forgiven ✓)":"(1 unpaired)"}</div>}
                </div>
                <div style={{textAlign:"right"}}>
                  <span style={{display:"inline-block",padding:"3px 9px",borderRadius:999,fontSize:11,fontWeight:700,background:chipColor+"20",color:chipColor,border:`1px solid ${chipColor}33`}}>
                    {st==="present"?"✓ Present":st==="minor_late"?"⏱ Minor Late":st==="late"?"🔴 Late":st==="absent"?"✗ Absent":st==="on_leave"?"📋 On Leave":"—"}
                  </span>
                  {shortUsed>0&&<div style={{fontSize:10,color:"#84cc16",marginTop:3}}>Short: {shortUsed}/{SHORT_LEAVE_PER_MONTH}</div>}
                </div>
              </div>
              {!isOnLeave&&<>
                {/* Manual status buttons */}
                <div style={{display:"flex",gap:5,marginBottom:6,flexWrap:"wrap"}}>
                  {[{k:"present",l:"✓ P",c:"success"},{k:"minor_late",l:"⏱ ML",c:"warn"},{k:"late",l:"🔴 L",c:"warn"},{k:"absent",l:"✗ A",c:"danger"}].map(x=>(
                    <button key={x.k} style={{...s.btn(st===x.k?x.c:""),padding:"5px 10px",fontSize:11,flex:1,opacity:st===x.k?1:0.6}} onClick={()=>setAttStatus(emp.empNo,attDate,{status:x.k,scanTime:scanTime||null,minorLate:x.k==="minor_late",coverUntil:x.k==="late"?COVER_END:null})}>
                      {x.l}
                    </button>
                  ))}
                </div>
                {/* Short leave buttons */}
                {!isOnLeave&&shortUsed<SHORT_LEAVE_PER_MONTH&&<div style={{display:"flex",gap:5}}>
                  <button style={{...s.btn(hasMorningShort?"purple":""),padding:"5px 10px",fontSize:10,flex:1,opacity:hasMorningShort?1:0.7}} onClick={()=>hasMorningShort?revokeShortLeave(emp.empNo,attDate,"morning"):grantShortLeave(emp.empNo,attDate,"morning")}>
                    {hasMorningShort?"✓ AM Short":"+ AM Short"} (8:30–10:00)
                  </button>
                  <button style={{...s.btn(hasEveShort?"purple":""),padding:"5px 10px",fontSize:10,flex:1,opacity:hasEveShort?1:0.7}} onClick={()=>hasEveShort?revokeShortLeave(emp.empNo,attDate,"evening"):grantShortLeave(emp.empNo,attDate,"evening")}>
                    {hasEveShort?"✓ PM Short":"+ PM Short"} ({emp.staffGrade==="junior"?"15:00":"14:45"}–16:15)
                  </button>
                </div>}
                {!isOnLeave&&shortUsed>=SHORT_LEAVE_PER_MONTH&&<div style={{fontSize:10,color:C.danger,textAlign:"center",padding:"4px 0"}}>Short leave quota used ({SHORT_LEAVE_PER_MONTH}/{SHORT_LEAVE_PER_MONTH} this month)</div>}
              </>}
            </div>;
          })}
        </div>
      );
    }

    // ── FINGER SCAN SYNC (ICT) ───────────────────────────────────
    if(tab==="scan") return(
      <div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>🖐 Finger Scan System</div>
        <div style={{...s.card,borderColor:"rgba(56,189,248,0.2)",background:"rgba(56,189,248,0.05)"}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>Auto-Sync from Finger Scanner</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:10}}>Imports scan-in times and auto-classifies all staff:</div>
          <div style={{fontSize:11,color:"#64748b",lineHeight:2,marginBottom:14}}>
            ✅ Scan ≤ 08:30 → <b>Present</b><br/>
            ⏱ Scan 08:31–09:00 → <b>Minor Late</b> (every 2 forgiven, no cover)<br/>
            🔴 Scan after 09:00 → <b>Late</b> (must cover until 16:45)<br/>
            ✗ No scan → <b>Absent</b><br/>
            📋 On approved leave → auto-excluded
          </div>
          <label style={s.label}>Select Date</label>
          <input type="date" style={{...s.input,marginBottom:12}} value={attDate} onChange={e=>setAttDate(e.target.value)} />
          <button style={{...s.btn("primary"),width:"100%",padding:"14px 0",fontSize:15}} onClick={()=>syncFingerScan(attDate)}>
            🖐 Sync Finger Scan for {attDate}
          </button>
        </div>
        {scanData[attDate]&&<>
          <div style={{fontSize:12,color:C.muted,fontWeight:700,marginTop:16,marginBottom:8}}>Scan Results — {attDate}</div>
          {/* Summary */}
          <div style={{...s.card,padding:"10px 12px",marginBottom:12}}>
            {[{l:"On time (≤08:30)",v:STAFF.filter(e=>{const t=scanData[attDate]?.[e.empNo];return t&&timeCmp(t,OFFICE_START)<=0;}).length,c:C.success},
              {l:"Minor late (08:31–09:00)",v:STAFF.filter(e=>{const t=scanData[attDate]?.[e.empNo];return t&&timeCmp(t,OFFICE_START)>0&&timeCmp(t,LATE_GRACE)<=0;}).length,c:"#84cc16"},
              {l:"Late (>09:00, cover til 16:45)",v:STAFF.filter(e=>{const t=scanData[attDate]?.[e.empNo];return t&&timeCmp(t,LATE_GRACE)>0;}).length,c:C.warn},
              {l:"No scan (absent)",v:STAFF.filter(e=>!scanData[attDate]?.[e.empNo]).length,c:C.danger},
            ].map(st=><div key={st.l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
              <span style={{fontSize:12,color:"#94a3b8"}}>{st.l}</span><b style={{color:st.c}}>{st.v}</b>
            </div>)}
          </div>
          {STAFF.map(emp=>{
            const scanTime=scanData[attDate]?.[emp.empNo];
            const st=getAttStatus(emp.empNo,attDate);
            const classified=classifyScanIn(scanTime,emp);
            return <div key={emp.empNo} style={{...s.card,padding:"10px 12px",marginBottom:5}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600}}>{emp.fullName}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{emp.designation}</div>
                  {classified.coverUntil&&<div style={{fontSize:10,color:C.warn,fontWeight:700}}>Must cover until {classified.coverUntil}</div>}
                  {classified.minorLate&&<div style={{fontSize:10,color:"#84cc16"}}>Minor late — counts toward monthly pair</div>}
                </div>
                <div style={{textAlign:"right"}}>
                  {scanTime?<div style={{fontSize:11,color:C.accent,marginBottom:3}}>🖐 {scanTime}</div>:<div style={{fontSize:11,color:C.muted,marginBottom:3}}>No scan</div>}
                  <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6,background:st==="present"?C.success+"20":st==="minor_late"?"#84cc1620":st==="late"?C.warn+"20":st==="absent"?C.danger+"20":C.muted+"20",color:st==="present"?C.success:st==="minor_late"?"#84cc16":st==="late"?C.warn:st==="absent"?C.danger:C.muted}}>
                    {st==="present"?"Present":st==="minor_late"?"Minor Late":st==="late"?"Late":st==="absent"?"Absent":st==="on_leave"?"On Leave":"—"}
                  </span>
                </div>
              </div>
            </div>;
          })}
        </>}
      </div>
    );

    // ── MONTHLY SUMMARY (ICT) ────────────────────────────────────
    if(tab==="monthly") {
      const [yr,mo]=reportMonth.split("-").map(Number);
      const daysInMonth=new Date(yr,mo,0).getDate();
      return(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:700}}>📊 Monthly Summary</div>
            <input type="month" style={{...s.input,width:160,fontSize:13,padding:"8px 10px"}} value={reportMonth} onChange={e=>setReportMonth(e.target.value)} />
          </div>
          {STAFF.map(emp=>{
            let pres=0,minorL=0,lateC=0,abs=0,onLeave=0,holidays=0,shortMorn=0,shortEve=0;
            for(let d=1;d<=daysInMonth;d++){
              const ds=`${reportMonth}-${String(d).padStart(2,"0")}`;
              const st=getAttStatus(emp.empNo,ds);
              if(isWkendHol(ds)) holidays++;
              else if(st==="present") pres++;
              else if(st==="minor_late") {pres++;minorL++;}  // minor late = counted as present
              else if(st==="late") {pres++;lateC++;}          // late = counted as present (covered)
              else if(st==="absent") abs++;
              else if(st==="on_leave") onLeave++;
            }
            // Count short leaves this month
            (shortLeaveRecs[emp.empNo]||[]).filter(r=>r.month===reportMonth).forEach(r=>{
              if(r.type==="morning") shortMorn++;
              else shortEve++;
            });
            const working=daysInMonth-holidays;
            const pct=working>0?Math.round(pres/working*100):0;
            const minorPairs=Math.floor(minorL/2);
            return <div key={emp.empNo} style={{...s.card,marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700}}>{emp.fullName}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{emp.designation} · <span style={{color:emp.staffGrade==="junior"?"#f59e0b":"#38bdf8"}}>{emp.staffGrade}</span></div>
                </div>
                <span style={{fontSize:14,fontWeight:800,color:pct>=90?C.success:pct>=75?C.warn:pct>0?C.danger:C.muted}}>{pres>0?pct+"%":"—"}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,fontSize:10,textAlign:"center",marginBottom:lateC>0||minorL>0||shortMorn+shortEve>0?8:0}}>
                {[{l:"Worked",v:pres,c:C.success},{l:"Absent",v:abs,c:C.danger},{l:"On Leave",v:onLeave,c:C.accent},{l:"Work Days",v:working,c:C.muted}].map(st=>(
                  <div key={st.l} style={{background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"4px 2px"}}><div style={{fontWeight:700,color:st.c}}>{st.v}</div><div style={{color:"#334155"}}>{st.l}</div></div>
                ))}
              </div>
              {(lateC>0||minorL>0||shortMorn+shortEve>0)&&<div style={{fontSize:10,color:"#475569",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:6,display:"flex",gap:8,flexWrap:"wrap"}}>
                {minorL>0&&<span style={{color:"#84cc16"}}>⏱ Minor late: {minorL} ({minorPairs} pair{minorPairs!==1?"s":""} forgiven)</span>}
                {lateC>0&&<span style={{color:C.warn}}>🔴 Late (>9): {lateC}</span>}
                {shortMorn>0&&<span style={{color:C.purple}}>🌅 AM short: {shortMorn}</span>}
                {shortEve>0&&<span style={{color:C.purple}}>🌇 PM short: {shortEve}</span>}
              </div>}
            </div>;
          })}
        </div>
      );
    }

    // ── UNAUTHORIZED FLAGS (ICT) ─────────────────────────────────
    if(tab==="flags") {
      const unauth=STAFF.flatMap(emp=>{
        const flags=[];
        Object.entries(attendance).forEach(([date,dayData])=>{
          const d=dayData[emp.empNo];
          const st=typeof d==="string"?d:d?.status;
          if(st==="absent"){
            const hasLeave=(leaveRecords[emp.empNo]||[]).some(r=>r.status==="Approved"&&date>=r.from&&date<=r.to);
            if(!hasLeave) flags.push({...emp,date});
          }
        });
        return flags;
      });
      // Late covers overdue: late >09:00 entries
      const lateCovers=STAFF.flatMap(emp=>{
        const flags=[];
        Object.entries(attendance).forEach(([date,dayData])=>{
          const d=dayData[emp.empNo];
          if(d?.status==="late"&&d?.coverUntil) flags.push({...emp,date,coverUntil:d.coverUntil,scanTime:d.scanTime});
        });
        return flags;
      });
      // Minor late pairs
      const minorLateFlags=STAFF.map(emp=>{
        const byMonth={};
        Object.entries(attendance).forEach(([date,dayData])=>{
          const d=dayData[emp.empNo];
          if(d?.minorLate||d?.status==="minor_late"){
            const m=date.slice(0,7);
            byMonth[m]=(byMonth[m]||[]);
            byMonth[m].push(date);
          }
        });
        return {emp, byMonth};
      }).filter(x=>Object.keys(x.byMonth).length>0);

      return(
        <div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>🚩 Flags & Late Cover</div>

          {lateCovers.length>0&&<>
            <div style={{fontSize:12,color:C.warn,fontWeight:700,marginBottom:8,textTransform:"uppercase"}}>🔴 Late After 09:00 — Must Cover Until 16:45</div>
            {lateCovers.map((e,i)=>(
              <div key={i} style={{...s.card,borderColor:"#f59e0b33",marginBottom:6,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontSize:12,fontWeight:700}}>{e.fullName}</div><div style={{fontSize:10,color:C.muted}}>{e.designation}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.warn}}>{e.date}</div><div style={{fontSize:10,color:"#94a3b8"}}>Scan: {e.scanTime} → Cover: {e.coverUntil}</div></div>
                </div>
              </div>
            ))}
          </>}

          {minorLateFlags.length>0&&<>
            <div style={{fontSize:12,color:"#84cc16",fontWeight:700,marginBottom:8,marginTop:16,textTransform:"uppercase"}}>⏱ Minor Lates (08:31–09:00) — Every 2 Forgiven</div>
            {minorLateFlags.map(({emp,byMonth})=>(
              <div key={emp.empNo} style={{...s.card,borderColor:"#84cc1622",marginBottom:6,padding:"10px 12px"}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{emp.fullName}</div>
                {Object.entries(byMonth).map(([month,dates])=>(
                  <div key={month} style={{fontSize:11,color:"#64748b",marginBottom:2}}>
                    {month}: {dates.length} minor late{dates.length!==1?"s":""} — {Math.floor(dates.length/2)} pair{Math.floor(dates.length/2)!==1?"s":""} forgiven{dates.length%2===1?" (1 remaining)":""}
                  </div>
                ))}
              </div>
            ))}
          </>}

          <div style={{fontSize:12,color:C.danger,fontWeight:700,marginBottom:8,marginTop:16,textTransform:"uppercase"}}>✗ Unauthorized Absences</div>
          {unauth.length===0?<div style={{...s.card,textAlign:"center",padding:24,color:C.success,fontSize:12}}>✅ No unauthorized absences</div>:
          unauth.map((e,i)=>(
            <div key={i} style={{...s.card,borderColor:"#ef444433",marginBottom:6,padding:"10px 12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:12,fontWeight:700}}>{e.fullName}</div><div style={{fontSize:10,color:C.muted}}>{e.designation}</div></div>
                <div style={{fontSize:12,color:C.danger,fontWeight:700}}>{e.date}</div>
              </div>
              <div style={{fontSize:11,color:C.warn,marginTop:3}}>Absent without approved leave</div>
            </div>
          ))}
        </div>
      );
    }

    return <div style={{...s.card,textAlign:"center",padding:40,color:C.muted}}>Coming soon</div>;
  };

  // ═══════════════════════════════════════════════════════════════
  // MAIN APP RENDER
  // ═══════════════════════════════════════════════════════════════
  return(
    <div style={s.wrap}>
      {Modal}{PinModal}
      {/* Top bar */}
      <div style={{background:"rgba(8,15,30,0.95)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#0369a1,#38bdf8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏛️</div>
          <div><div style={{fontSize:13,fontWeight:700,lineHeight:1.2}}>COT Ratnapura</div><div style={{fontSize:9,color:C.muted}}>DTET · Leave Management</div></div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {notifications.length>0&&<div style={{width:8,height:8,borderRadius:"50%",background:C.danger}}/>}
          {["director","registrar","leave_officer","ict_officer"].includes(userRole)&&
            <button style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,cursor:"pointer",fontSize:13,padding:"6px 10px"}} onClick={()=>setPinModal(true)}>🔑</button>}
          <button style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,cursor:"pointer",fontSize:13,padding:"6px 10px"}} onClick={doLogout}>Exit</button>
        </div>
      </div>
      {/* Content */}
      <div style={s.main}>{renderTab()}</div>
      {/* Bottom nav */}
      <div style={s.bottomNav}>
        {navItems.map(n=>(
          <button key={n.k} style={s.navItem(tab===n.k,roleCol)} onClick={()=>setTab(n.k)}>
            <span style={{fontSize:28,lineHeight:1}}>{n.i}</span>
            <span>{n.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
