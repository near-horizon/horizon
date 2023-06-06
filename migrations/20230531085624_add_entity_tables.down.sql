-- Add migration script here
-- Contributions table
DROP INDEX contribution_actions_end_date_idx;
DROP INDEX contribution_actions_start_date_idx;
DROP INDEX contribution_actions_description_idx;
DROP INDEX contribution_actions_vendor_id_idx;
DROP INDEX contribution_actions_project_id_idx;
DROP INDEX contribution_actions_cid_idx;
DROP INDEX contribution_actions_cid_project_id_vendor_id_idx;
DROP TABLE contribution_actions;

DROP INDEX contributions_price_idx;
DROP INDEX contributions_status_idx;
DROP INDEX contributions_vendor_id_idx;
DROP INDEX contributions_project_id_idx;
DROP INDEX contributions_cid_idx;
DROP INDEX contributions_cid_project_id_vendor_id_idx;
DROP TABLE contributions;

-- Proposals table
DROP INDEX proposals_payment_source_idx;
DROP INDEX proposals_payment_type_idx;
DROP INDEX proposals_proposal_type_idx;
DROP INDEX proposals_price_idx;
DROP INDEX proposals_end_date_idx;
DROP INDEX proposals_start_date_idx;
DROP INDEX proposals_title_idx;
DROP INDEX proposals_vendor_id_idx;
DROP INDEX proposals_project_id_idx;
DROP INDEX proposals_cid_idx;
DROP TABLE proposals;

-- Requests table
DROP INDEX requests_budget_idx;
DROP INDEX requests_deadline_idx;
DROP INDEX requests_source_idx;
DROP INDEX requests_tags_idx;
DROP INDEX requests_payment_type_idx;
DROP INDEX requests_request_type_idx;
DROP INDEX requests_open_idx;
DROP INDEX requests_project_id_idx;
DROP INDEX requests_cid_idx;
DROP TABLE requests;

DROP TYPE PaymentSource;

DROP TYPE PaymentType;

DROP TYPE RequestType;

-- Investors table
DROP INDEX investors_vertical_idx;
DROP INDEX investors_specialization_idx;
DROP INDEX investors_location_idx;
DROP INDEX investors_description_idx;
DROP INDEX investors_tagline_idx;
DROP INDEX investors_name_idx;
DROP INDEX investors_verified_idx;
DROP INDEX investors_id_idx;
DROP TABLE investors;

-- Vendors table
DROP INDEX vendors_work_idx;
DROP INDEX vendors_payments_idx;
DROP INDEX vendors_vendor_type_idx;
DROP INDEX vendors_rate_idx;
DROP INDEX vendors_location_idx;
DROP INDEX vendors_description_idx;
DROP INDEX vendors_tagline_idx;
DROP INDEX vendors_services_idx;
DROP INDEX vendors_name_idx;
DROP INDEX vendors_verified_idx;
DROP INDEX vendors_id_idx;
DROP TABLE vendors;

DROP TYPE Work;

DROP TYPE Payment;

DROP TYPE VendorType;

-- Projects table
DROP INDEX projects_integration_idx;
DROP INDEX projects_team_idx;
DROP INDEX projects_founders_idx;
DROP INDEX projects_userbase_idx;
DROP INDEX projects_stage_idx;
DROP INDEX projects_vertical_idx;
DROP INDEX projects_verified_idx;
DROP INDEX projects_name_idx;
DROP INDEX projects_id_idx;
DROP TABLE projects;
