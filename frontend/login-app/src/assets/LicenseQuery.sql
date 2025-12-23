--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: batch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.batch_id_seq
    START WITH 100000
    INCREMENT BY 1
    MINVALUE 100000
    MAXVALUE 999999
    CACHE 1;


ALTER SEQUENCE public.batch_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: batch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.batch (
    b_id integer DEFAULT nextval('public.batch_id_seq'::regclass) NOT NULL,
    batch_code integer,
    batch_name character varying(255),
    v_id integer,
    CONSTRAINT batch_batch_code_check CHECK (((batch_code >= 1000000) AND (batch_code <= 9999999))),
    CONSTRAINT batch_batch_id_check CHECK (((b_id >= 100000) AND (b_id <= 999999)))
);


ALTER TABLE public.batch OWNER TO postgres;

--
-- Name: entitlement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entitlement (
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    e_id integer NOT NULL,
    entitlement_id character varying(8),
    v_id integer
);


ALTER TABLE public.entitlement OWNER TO postgres;

--
-- Name: entitlement_e_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entitlement_e_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entitlement_e_id_seq OWNER TO postgres;

--
-- Name: entitlement_e_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entitlement_e_id_seq OWNED BY public.entitlement.e_id;


--
-- Name: feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feature (
    feature_id integer NOT NULL,
    feature_name character varying(50),
    v_id integer,
    f_id integer NOT NULL
);


ALTER TABLE public.feature OWNER TO postgres;

--
-- Name: feature_f_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feature_f_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feature_f_id_seq OWNER TO postgres;

--
-- Name: feature_f_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feature_f_id_seq OWNED BY public.feature.f_id;


--
-- Name: feature_product_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feature_product_map (
    map_id integer NOT NULL,
    f_id integer,
    p_id integer,
    v_id integer
);


ALTER TABLE public.feature_product_map OWNER TO postgres;

--
-- Name: feature_product_map_map_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feature_product_map_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feature_product_map_map_id_seq OWNER TO postgres;

--
-- Name: feature_product_map_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feature_product_map_map_id_seq OWNED BY public.feature_product_map.map_id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name character varying(100) NOT NULL,
    v_id integer,
    p_id integer NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_ent_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_ent_map (
    map_id integer NOT NULL,
    p_id integer,
    v_id integer,
    e_id integer
);


ALTER TABLE public.product_ent_map OWNER TO postgres;

--
-- Name: product_ent_map_map_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_ent_map_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_ent_map_map_id_seq OWNER TO postgres;

--
-- Name: product_ent_map_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_ent_map_map_id_seq OWNED BY public.product_ent_map.map_id;


--
-- Name: product_p_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_p_id_seq OWNER TO postgres;

--
-- Name: product_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_p_id_seq OWNED BY public.product.p_id;


--
-- Name: user_batch_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_batch_map (
    map_id integer NOT NULL,
    user_id integer NOT NULL,
    b_id integer NOT NULL
);


ALTER TABLE public.user_batch_map OWNER TO postgres;

--
-- Name: user_batch_user_batch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_batch_user_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_batch_user_batch_id_seq OWNER TO postgres;

--
-- Name: user_batch_user_batch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_batch_user_batch_id_seq OWNED BY public.user_batch_map.map_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(14),
    role character varying(20) NOT NULL,
    v_id integer,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('admin'::character varying)::text, ('vendor'::character varying)::text, ('end-user'::character varying)::text]))),
    CONSTRAINT users_user_id_check CHECK (((user_id >= 10000) AND (user_id <= 99999)))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: vendor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor (
    v_id integer NOT NULL,
    vendor_code integer,
    vendor_name character varying(50),
    CONSTRAINT vendor_vendor_code_check CHECK (((vendor_code >= 1000000) AND (vendor_code <= 9999999))),
    CONSTRAINT vendor_vendor_id_check CHECK (((v_id >= 100000) AND (v_id <= 999999)))
);


ALTER TABLE public.vendor OWNER TO postgres;

--
-- Name: entitlement e_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entitlement ALTER COLUMN e_id SET DEFAULT nextval('public.entitlement_e_id_seq'::regclass);


--
-- Name: feature f_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature ALTER COLUMN f_id SET DEFAULT nextval('public.feature_f_id_seq'::regclass);


--
-- Name: feature_product_map map_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_product_map ALTER COLUMN map_id SET DEFAULT nextval('public.feature_product_map_map_id_seq'::regclass);


--
-- Name: product p_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN p_id SET DEFAULT nextval('public.product_p_id_seq'::regclass);


--
-- Name: product_ent_map map_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_ent_map ALTER COLUMN map_id SET DEFAULT nextval('public.product_ent_map_map_id_seq'::regclass);


--
-- Name: user_batch_map map_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_batch_map ALTER COLUMN map_id SET DEFAULT nextval('public.user_batch_user_batch_id_seq'::regclass);


--
-- Data for Name: batch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.batch (b_id, batch_code, batch_name, v_id) FROM stdin;
100006	1000000	Batch 1	10001
100007	1000001	Batch 2	10005
100008	1000003	Batch 3	10005
100009	1000004		10005
100015	1000001	Batch 2	10001
100016	1000001	Philips	10003
\.


--
-- Data for Name: entitlement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entitlement (date_created, e_id, entitlement_id, v_id) FROM stdin;
2025-01-06 17:03:31.031+05:30	7	WF5TOPW0	10001
2025-01-07 14:29:52.191+05:30	27	WH05YHOD	10001
2025-01-07 14:32:33.28+05:30	28	T4676JKH	10001
2025-01-07 14:47:28.339+05:30	29	1VR0QG0O	10001
2025-01-07 15:32:06.252+05:30	30	RUGCMZ40	10001
2025-01-08 09:52:49.909+05:30	31	6ELKWLQE	10001
\.


--
-- Data for Name: feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feature (feature_id, feature_name, v_id, f_id) FROM stdin;
10001	Feature 1	10001	1
10002	Feature 2	10001	2
10003	Test Feature	10001	3
10004	Test Feature2	10001	6
10005	Demo 	10001	7
\.


--
-- Data for Name: feature_product_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feature_product_map (map_id, f_id, p_id, v_id) FROM stdin;
10	1	23	10001
11	6	24	10001
12	3	24	10001
13	7	25	10001
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (product_id, product_name, v_id, p_id) FROM stdin;
10001	Test Product	10001	18
10002	Product2	10001	23
10003	Product3	10001	24
10004	Demo Product	10001	25
\.


--
-- Data for Name: product_ent_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_ent_map (map_id, p_id, v_id, e_id) FROM stdin;
1	24	10001	12
2	18	10001	13
3	24	10001	14
4	24	10001	15
5	23	10001	16
6	18	10001	17
7	24	10001	18
8	24	10001	19
9	24	10001	20
10	24	10001	21
11	25	10001	21
12	25	10001	22
13	25	10001	23
14	25	10001	24
15	25	10001	25
16	24	10001	26
17	24	10001	27
18	18	10001	28
19	23	10001	29
20	24	10001	30
21	18	10001	31
\.


--
-- Data for Name: user_batch_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_batch_map (map_id, user_id, b_id) FROM stdin;
1	10002	100000
9	10003	100000
20	10004	100007
21	10019	100007
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, role, v_id) FROM stdin;
10001	Hannah	Pass@123	vendor	\N
10008	Purva		end-user	\N
10002	Jabersha		end-user	\N
10004	Abhi		end-user	\N
10003	Sakshi	Pass@123	vendor	\N
10005	Payal		end-user	\N
10011	Payal		end-user	\N
10019	Payal		end-user	\N
\.


--
-- Data for Name: vendor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendor (v_id, vendor_code, vendor_name) FROM stdin;
100001	1000001	Vendor1
\.


--
-- Name: batch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.batch_id_seq', 100016, true);


--
-- Name: entitlement_e_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entitlement_e_id_seq', 31, true);


--
-- Name: feature_f_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feature_f_id_seq', 7, true);


--
-- Name: feature_product_map_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feature_product_map_map_id_seq', 13, true);


--
-- Name: product_ent_map_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_ent_map_map_id_seq', 21, true);


--
-- Name: product_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_p_id_seq', 25, true);


--
-- Name: user_batch_user_batch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_batch_user_batch_id_seq', 21, true);


--
-- Name: batch batch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batch
    ADD CONSTRAINT batch_pkey PRIMARY KEY (b_id);


--
-- Name: entitlement entitlement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entitlement
    ADD CONSTRAINT entitlement_pkey PRIMARY KEY (e_id);


--
-- Name: feature feature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature
    ADD CONSTRAINT feature_pkey PRIMARY KEY (f_id);


--
-- Name: feature_product_map feature_product_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_product_map
    ADD CONSTRAINT feature_product_map_pkey PRIMARY KEY (map_id);


--
-- Name: product_ent_map product_ent_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_ent_map
    ADD CONSTRAINT product_ent_map_pkey PRIMARY KEY (map_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (p_id);


--
-- Name: vendor unique_vendor_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT unique_vendor_id UNIQUE (v_id);


--
-- Name: user_batch_map user_batch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_batch_map
    ADD CONSTRAINT user_batch_pkey PRIMARY KEY (map_id);


--
-- Name: user_batch_map user_batch_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_batch_map
    ADD CONSTRAINT user_batch_user_id_unique UNIQUE (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: vendor vendor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (v_id);


--
-- Name: feature_product_map feature_product_map_f_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_product_map
    ADD CONSTRAINT feature_product_map_f_id_fkey FOREIGN KEY (f_id) REFERENCES public.feature(f_id) ON DELETE CASCADE;


--
-- Name: feature_product_map feature_product_map_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_product_map
    ADD CONSTRAINT feature_product_map_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.product(p_id) ON DELETE CASCADE;


--
-- Name: users fk_vendor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_vendor FOREIGN KEY (v_id) REFERENCES public.vendor(v_id);


--
-- Name: product_ent_map product_ent_map_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_ent_map
    ADD CONSTRAINT product_ent_map_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.product(p_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

