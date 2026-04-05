-- ============================================================
-- COT Ratnapura Leave Management System
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. PINS table
create table if not exists pins (
  emp_no text primary key,
  pin text not null,
  updated_at timestamptz default now()
);

-- Insert default PINs
insert into pins (emp_no, pin) values
  ('11004',  '1234'),
  ('250015', '5678'),
  ('20990',  '1111'),
  ('255003', '2222')
on conflict (emp_no) do nothing;

-- 2. LEAVE RECORDS table
create table if not exists leave_records (
  id bigint primary key,
  emp_no text not null,
  type text not null,
  from_date text not null,
  to_date text not null,
  days integer not null,
  reason text not null,
  status text not null default 'Pending',
  applied_on text not null,
  approved_on text,
  approved_by text,
  recommendation text,
  med_cert_required boolean default false,
  med_cert_received boolean default false,
  acting_emp_no text,
  acting_name text,
  acting_confirmed boolean default false,
  created_at timestamptz default now()
);

-- 3. ATTENDANCE table
create table if not exists attendance (
  id bigserial primary key,
  emp_no text not null,
  date text not null,
  status text,
  scan_time text,
  minor_late boolean default false,
  cover_until text,
  updated_at timestamptz default now(),
  unique(emp_no, date)
);

-- 4. SHORT LEAVE table
create table if not exists short_leaves (
  id bigserial primary key,
  emp_no text not null,
  date text not null,
  type text not null,
  month text not null,
  granted_by text,
  created_at timestamptz default now(),
  unique(emp_no, date, type)
);

-- 5. COMPENSATORY LEAVE table
create table if not exists comp_leave (
  id bigserial primary key,
  emp_no text not null,
  work_date text not null,
  half_day boolean default false,
  days_earned numeric(3,1) not null default 1,
  approved_by text not null,
  approved_on text not null,
  expires_on text not null,
  used boolean default false,
  used_on text,
  note text,
  created_at timestamptz default now()
);

-- 6. SCAN DATA table
create table if not exists scan_data (
  id bigserial primary key,
  emp_no text not null,
  date text not null,
  scan_time text,
  created_at timestamptz default now(),
  unique(emp_no, date)
);

-- Allow all operations (no auth — app handles security via PIN)
alter table pins enable row level security;
alter table leave_records enable row level security;
alter table attendance enable row level security;
alter table short_leaves enable row level security;
alter table comp_leave enable row level security;
alter table scan_data enable row level security;

-- Allow anon key to read/write all tables
create policy "allow_all_pins" on pins for all using (true) with check (true);
create policy "allow_all_leave" on leave_records for all using (true) with check (true);
create policy "allow_all_attendance" on attendance for all using (true) with check (true);
create policy "allow_all_short" on short_leaves for all using (true) with check (true);
create policy "allow_all_comp" on comp_leave for all using (true) with check (true);
create policy "allow_all_scan" on scan_data for all using (true) with check (true);
