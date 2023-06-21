# Aggregator

This package is responsible for aggregating on-chain data from the Horizon
smart contract and from the SocialDB smart contract, then ingesting it into
our database.

## Flow

Here are the steps which the aggregator performs:

1. Connect to the database and blockchain.
2. Fetch all the projects (more details on how this is done can be found [here](#project-vendor-investor-fetching))
3. Insert all the projects (more details on how this is done can be found [here](#project-vendor-investor-insertion))
4. Fetch all the vendors
5. Insert all the vendors
6. Fetch all the investors
7. Insert all the investors
8. Fetch all the requests (more details on how this is done can be found [here](#requests-fetching))
9. Insert all the requests (more details on how this is done can be found [here](#requests-insertion))
10. Fetch all the contributions (more details on how this is done can be found [here](#contributions-fetching))
11. Insert all the contributions (more details on how this is done can be found [here](#contributions-insertion))
12. Fetch all the claims (more details on how this is done can be found [here](#claims-fetching))
13. Insert all the claims (more details on how this is done can be found [here](#claims-insertion))
14. Delete all deleted claims (more details on how this is done can be found [here](#claims-deletion))
15. Delete all deleted contributions (more details on how this is done can be found
    [here](#contributions-deletion))
16. Delete all deleted requests (more details on how this is done can be found [here](#requests-deletion))
17. Delete all deleted investors (more details on how this is done can be found [here](#project-vendor-investor-deletion))
18. Delete all deleted vendors
19. Delete all deleted projects

### Fetching

#### Project, vendor, investor fetching

Each of the entities has two components to them:

1. The details stored in the Horizon smart contract
2. The social details stored in the SocialDB smart contract

In order to fetch all the details of all the entities we follow a similar approach
that is abstracted into a trait [`FetchAll`](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/lib.rs#L93).
This trait requires the implementer (project, vendor or investor) to describe how
to get a list of all the account IDs of the entity and how to get the details of
the entity from the Horizon contract.

When this is implemented like in:

- [project.rs](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/project.rs#L219)
- [vendor.rs](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/vendor.rs#L222)
- [investor.rs](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/investor.rs#L149)

The trait provides auto-implementations for fetching details for all of the entities
by iterating over batches of concurrent detail fetching calls to the blockchain which
you can see [here](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/lib.rs#L187).

#### Requests fetching

Requests have two parts just like the above mentioned entities, but unlike those
the second part that makes them is not the SocialDB smart contract data, but
the proposals associated with each requests whose data also lives in the Horizon
smart contract.

In order to fetch all the requests, and each requests proposals with their
respective details, we first need to fetch all the request IDs, [get the details
of each request](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/request.rs#L40),
[get the list of proposals for each request](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/request.rs#L63),
[get the details of each proposal](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/request.rs#L86)
and finally combine that data into a [`FullRequest`](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/request.rs#L131).

#### Contributions fetching

Contributions do not have multiple parts, but they are more complicated to list
as they are grouped by project and vendor pairs.

In order to fetch all the contributions, we first fetch all the project IDs (like
outlined above) so that we can fetch all of their [contribution histories](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/contribution.rs#L79),
and then fetch each [contributions details](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/contribution.rs#L101).

#### Claims fetching

Claims are the simplest to fetch as they only require two steps, namely [listing
out all of their IDs](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/claims.rs#L14)
and then [fetching their details](https://github.com/near-horizon/horizon/blob/5afca679008164a996d60de296f63853b6e0815a/aggregator/src/claims.rs#L31).

### Insertion

#### Project, vendor, investor insertion

#### Requests insertion

#### Contributions insertion

#### Claims insertion

### Deletion

#### Project, vendor, investor deletion

#### Requests deletion

#### Contributions deletion

#### Claims deletion
