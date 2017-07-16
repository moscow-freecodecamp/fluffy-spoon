/* users */

CREATE TABLE public.users
(
   id serial,
   email text,
   password text,
   firstname text,
   lastname text,
   verify_token text,
   verified_email boolean,
   resetpasstoken text,
   resetpassexpiry text,
   role text
)
WITH (
  OIDS = FALSE
);

/* notes */

CREATE TABLE public.notes
(
   id serial,
   title text,
   text text,
   createdby text,
   createdon date
)
WITH (
  OIDS = FALSE
);
