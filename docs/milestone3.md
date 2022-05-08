Part 1: Database implementation:
accounts document
  {
    _id: Id Object,
    user: String,
    pass: String
  }

{
    _id: Id Object,
    club: String,
    'event-list': [
      {
        event: String,
        date: String,
        time: String,
        location: String,
        description: String
      }
    ],
    'presidents-name': String,
    'club-description': String,
    'club-image': String,
    'club-video': String,
    'club-applications': []
  }

Secret for deploying MongoDB stored in Heroku’s environment variable


Division of labor:
Yuval - Implemented new connection to mongodb database. Debugged the server and client side requests to the server.

Natalie - Deployed to Heroku and troubleshooted any issues encountered. Assisted Yuval with debugging server communications and helped with code cleanup.

Sebastian - Created most of the final document and led the effort in organizing, cleaning, and refactoring front end code.

Catherine - Has the flu
