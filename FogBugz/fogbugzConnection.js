/**
 fogbugzConnection.js
 FogBugz API
*/

/*
┌───────────────────────────────────────
│ FogBugz Connection Wrapper Object
└───────────────────────────────────────
*/
var FeatureCaseType = "Feature";
var BugFixCaseType = "Bug";
var ScheduleItemCaseType = "Schedule Item";
var InquiryCaseType = "Inquiry";

var FogBugzRootURL = "https://fogbugz.dsi.co/";
var FogBugzAPIRef = "api.asp?";
function fogbugzConnection(email){
    this.LoggedInAs = new fogbugzUser(email);
    this.DepartmentPhase = "";    
    this.SessionToken = "";    
    this.MilestoneListing = [];    
    this.MilestoneChartInfo = null;
    this.DeveloperInfo = [];
    this.MilestoneStartDate = null;

    this.FeatureCaseType = FeatureCaseType;
    this.BugFixCaseType = BugFixCaseType;
    this.ScheduleItemCaseType = ScheduleItemCaseType;
    this.InquiryCaseType = InquiryCaseType;

    this.GetLoggedInAsProperty = function () { return "LoggedInAs"; };
    this.GetDepartmentPhaseProperty = function () { return "DepartmentPhase"; };
    this.GetSessionTokenProperty = function () { return "SessionToken"; };
    this.GetMilestoneListingProperty = function () { return "MilestoneListing"; };
    this.GetMilestoneChartInfoProperty = function () { return "MilestoneChartInfo"; };
    this.GetDeveloperInfoProperty = function () { return "DeveloperInfo"; };
    this.GetMilestoneStartDateProperty = function () { return "MilestoneStartDate"; };
}
fogbugzConnection.prototype.logon = function(password, whatToDoNext){ FogBugzLoginSettingTokenAndUserInfo(password, this, whatToDoNext); }
fogbugzConnection.prototype.updateDepartmentStatus = function(whatToDoNext) { FogBugzUpdateDepartmentStatus(this, whatToDoNext); }
fogbugzConnection.prototype.updateCurrentMilestoneListing = function(whatToDoNext){ FogBugzGetCurrentMilestoneListing(this, whatToDoNext); }
fogbugzConnection.prototype.updateCurrentMilestoneChartInfo = function(whatToDoNext) { FogBugzGetCurrentMilestoneChartInfo(this, whatToDoNext); }
fogbugzConnection.prototype.updateDeveloperInfo = function(userEmailCrossRef, whatToDoNext) { FogBugzGetDeveloperInfo(userEmailCrossRef, this, whatToDoNext); }
fogbugzConnection.prototype.getPhaseColor = function(phase) { return FogBugzGetPhaseColor(phase); }
fogbugzConnection.prototype.getPhaseStatuses = function() { return FogBugzGetPhaseStatuses(this); }

/*
┌───────────────────────────────────────
│ FogBugz DTOs
└───────────────────────────────────────
*/
function fogbugzUser(email){
    this.Email = email;
    this.Name = "";
    this.FullName = "";
    this.Id = 0;
    this.WorkingOnCaseId = 0;
    this.WorkingOnCaseName = "";
    this.WorkingOnStartWorkDate = null;

    this.GetEmailProperty = function () { return "Email"; };
    this.GetNameProperty = function () { return "Name"; };
    this.GetFullNameProperty = function () { return "FullName"; };
    this.GetIdProperty = function () { return "Id"; };
    this.GetWorkingOnCaseIdProperty = function () { return "WorkingOnCaseId"; };
    this.GetWorkingOnCaseNameProperty = function () { return "WorkingOnCaseName"; };
    this.GetWorkingOnStartWorkDateProperty = function () { return "WorkingOnStartWorkDate"; };
}

function fogbugzMilestoneListing(milestoneName, milestoneId, backlogPriority, caseType, caseNumber, caseDesc, percentComplete, completedDate, velocity){    
    this.MilestoneName = milestoneName;
    this.MilestoneId = milestoneId;
    this.MilestoneDueDate = null;
    this.BacklogPriority = backlogPriority;
    this.CaseType = caseType;
    this.CaseNumber = caseNumber;
    this.CaseDesc = caseDesc;
    this.PercentComplete = percentComplete;
    this.CompletedDate = completedDate;
    this.Velocity = velocity;

    this.GetMilestoneNameProperty = function () { return "MilestoneName"; };
    this.GetMilestoneIdProperty = function () { return "MilestoneId"; };
    this.GetMilestoneDueDateProperty = function () { return "MilestoneDueDate"; };
    this.GetBacklogPriorityProperty = function () { return "BacklogPriority"; };
    this.GetCaseTypeProperty = function () { return "CaseType"; };
    this.GetCaseNumberProperty = function () { return "CaseNumber"; };
    this.GetCaseDescProperty = function () { return "CaseDesc"; };
    this.GetPercentCompleteProperty = function () { return "PercentComplete"; };
    this.GetCompletedDateProperty = function () { return "CompletedDate"; };
    this.GetVelocityProperty = function () { return "Velocity"; };
}

function fogbugzMilestoneChartInfo(burndownChartVectorSeries, projectionChartVectorSeries, totalLevelOfEffort, levelOfEffortCompleted, avgVelocityPerDay, currentVelocityPerWeek, estimatedMilestoneDurationInDays){
    this.BurndownChartVectorSeries = burndownChartVectorSeries;
    this.ProjectionChartVectorSeries = projectionChartVectorSeries;
    this.TotalLevelOfEffort = totalLevelOfEffort;
    this.LevelOfEffortCompleted = levelOfEffortCompleted;
    this.AvgVelocityPerDay = avgVelocityPerDay;
    this.CurrentVelocityPerWeek = currentVelocityPerWeek;
    this.EstimatedMilestoneDurationInDays = estimatedMilestoneDurationInDays;

    this.GetBurndownChartVectorSeriesProperty = function () { return "BurndownChartVectorSeries"; };
    this.GetProjectionChartVectorSeriesProperty = function () { return "ProjectionChartVectorSeries"; };
    this.GetTotalLevelOfEffortProperty = function () { return "TotalLevelOfEffort"; };
    this.GetLevelOfEffortCompletedProperty = function () { return "LevelOfEffortCompleted"; };
    this.GetAvgVelocityPerDayProperty = function () { return "AvgVelocityPerDay"; };
    this.GetCurrentVelocityPerWeekProperty = function () { return "CurrentVelocityPerWeek"; };
    this.GetEstimatedMilestoneDurationInDaysProperty = function () { return "EstimatedMilestoneDurationInDays"; };
}

function fogbugzMilestoneChartVector(caseNumber, dateCompleted, velocity){
    this.CaseNumber = caseNumber;
    this.DateCompleted = dateCompleted;
    this.Velocity = velocity;

    this.GetCaseNumberProperty = function () { return "CaseNumber"; };
    this.GetDateCompletedProperty = function () { return "DateCompleted"; };
    this.GetVelocityProperty = function () { return "Velocity"; };
}

function fogbugzDeveloperInfo(userInfo){
    this.UserInfo = userInfo;

    this.GetUserInfoProperty = function () { return "UserInfo"; };
}

function fogbugzUserActivity(user, taskList){
    this.User = user;
    this.TaskList = taskList;

    this.GetUserProperty = function () { return "User"; };
    this.GetTaskListProperty = function () { return "TaskList"; };
}

function fogbugzUserTaskEntry(caseType, caseNumber, caseDesc, percentComplete, completedDate, lastActiveDate, isMilestoneTask, active){
    this.CaseType = caseType;
    this.CaseNumber = caseNumber;
    this.CaseDesc = caseDesc;
    this.PercentComplete = percentComplete;
    this.CompletedDate = completedDate;
    this.LastActiveDate = lastActiveDate;
    this.IsMilestoneTask = isMilestoneTask;
    this.Active = active;

    this.GetCaseTypeProperty = function () { return "CaseType"; };
    this.GetCaseNumberProperty = function () { return "CaseNumber"; };
    this.GetCaseDescProperty = function () { return "CaseDesc"; };
    this.GetPercentCompleteProperty = function () { return "PercentComplete"; };
    this.GetCompletedDateProperty = function () { return "CompletedDate"; };
    this.GetLastActiveDateProperty = function () { return "LastActiveDate"; };
    this.GetIsMilestoneTaskProperty = function () { return "IsMilestoneTask"; };
    this.GetActiveProperty = function () { return "Active"; };
}

/*
┌───────────────────────────────────────
│ FogBugz API Commands
└───────────────────────────────────────
*/
function GetFogBugzCommand(command){
    return format("{0}{1}{2}", FogBugzRootURL, FogBugzAPIRef, command);
}

var FogBugzLogonCommand = "cmd=logon&email={0}&password={1}";
function Login(email, password, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzLogonCommand);
    commandXhr.GetString = format(command, email, password);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzListPeopleCommand = "cmd=listPeople&token={0}";
function ListPeople(token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzListPeopleCommand);
    commandXhr.GetString = format(command, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzSetFilterCommand = "cmd=setCurrentFilter&sFilter={0}&token={1}";
function SetCurrentFilter(sFilter, token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzSetFilterCommand);
    commandXhr.GetString = format(command, sFilter, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzListCurrentFilterCommand = "cmd=search&token={0}";
function ListCurrentFilter(token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzListCurrentFilterCommand);
    commandXhr.GetString = format(command, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzSearchCasesCommand = "cmd=search&q={0}&cols={1}&token={2}";
function SearchForCases(caseList, columns, token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzSearchCasesCommand);
    var caseListString = toDelimitedString(caseList);
    commandXhr.GetString = format(command, caseListString, columns, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzPeopleCommand = "cmd=listPeople&token={0}";
function ListFogBugzUsers(token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzPeopleCommand);
    commandXhr.GetString = format(command, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzListMilestonesCommand = "cmd=listFixFors&ixFixFor={0}&token={1}";
function GetMilestones(milestoneId, token, whatToDoWithResult){
    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzListMilestonesCommand);
    commandXhr.GetString = format(command, milestoneId, token);
    commandXhr.whatToDoWithXMLResult = whatToDoWithResult;
    commandXhr.go();
}

var FogBugzTimeTrackingCommand = "cmd=listIntervals&dtStart={0}&dtEnd={1}{2}&token={3}"
var FogBugzOptionalPersonParameter = "&ixPerson={0}";
function ListUserActivityCases(startDate, endDate, userId, token, whatToDoWithResult){
    var userParameter = "";
    if (userId != null && userId > 0) userParameter = format(FogBugzOptionalPersonParameter, userId);
    var startDateString = "";
    if (startDate != null) startDateString = startDate.toFogBugzDateTimeString();
    var endDateString = "";
    if (endDate != null) endDateString = endDate.toFogBugzDateTimeString();

    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzTimeTrackingCommand);
    commandXhr.GetString = format(command, startDateString, endDateString, userParameter, token);
    commandXhr.whatToDoWithXMLResult = function(xmlResponse) { whatToDoWithResult(GetUniqueCaseNumbersAndNewestActiveDatesViaIntervalsFromXMLResponse(xmlResponse)); };
    commandXhr.go();
}

function ListUserWorkingOnCaseId(userId, token, whatToDoWithResult){
    var userParameter = "";
    if (userId != null && userId > 0) userParameter = format(FogBugzOptionalPersonParameter, userId);
    var startDateString = (new Date()).toFogBugzDateString();
    var endDateString = "";

    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzTimeTrackingCommand);
    commandXhr.GetString = format(command, startDateString, endDateString, userParameter, token);
    commandXhr.whatToDoWithXMLResult = function(xmlResponse) {
        whatToDoWithResult(GetCaseNumberViaIntervalsWithEmptyEndDateFromXMLResponse(xmlResponse));
    }
    commandXhr.go();
}

var FogBugzCaseTitleAndLastUpdatedFromNumberCommand = "cmd=listIntervals&dtStart={0}&dtEnd=&ixPerson={1}&token={2}";
function GetCaseTitleAndLastUpdatedFromNumber(userId, caseNumber, currentPhase, token, whatToDoWithResult){
    var phase = currentPhase;

    var commandXhr = new xhr();
    var command = GetFogBugzCommand(FogBugzCaseTitleAndLastUpdatedFromNumberCommand);
    var threeMonths = 3 * 30 * 24 * 60 * 60 * 1000;
    var fogBugzThreeMonthsAgo = new Date((new Date()).setTime((new Date()).getTime() - threeMonths)).toFogBugzDateTimeString();
    commandXhr.GetString = format(command, fogBugzThreeMonthsAgo, userId, token);
    commandXhr.whatToDoWithXMLResult = function (xmlResponse) {
        var rawTitles = toArray(ParseXMLAllGrandChildNodeValuesFromParentNodesOptionalValueCheck(xmlResponse, "intervals", "interval", "sTitle", [["ixBug", caseNumber], ["fDeleted", "false"]]));
        var title = rawTitles[0];

        var rawStartDatePairs = toArray(ParseXMLAllGrandChildNodeValuePairsFromParentNodesOptionalValueCheck(xmlResponse, "intervals", "interval", ["ixBug", "dtStart"], [["fDeleted", "false"]]));
        var startDatePairs = [];
        rawStartDatePairs.forEach(function (nextStartDatePair) {
            startDatePairs.push([nextStartDatePair[0], nextStartDatePair[1].parseFogBugzDate()]);
        });
        startDatePairs = startDatePairs.sortByIndex(1, true);
        var ignoreList = [];        
        if (phase > 0) {
            ignoreList.push(KnownPhaseCases[1]);
            ignoreList.push(KnownPhaseCases[2]);       
        }
        var lastStartActivityDate = new Date(new Date().setTime(startDatePairs.getLastValueFromUnchangedAdjacentKeys(ignoreList)));

        whatToDoWithResult(title, lastStartActivityDate);
    };
    commandXhr.go();
}

/*
┌───────────────────────────────────────
│ FogBugz Interaction
└───────────────────────────────────────
*/
function FogBugzLoginSettingTokenAndUserInfo(password, connection, whatToDoNext){
    var email = connection.LoggedInAs.Email;    
    var whatToDoWithLoginXMLResult = function(xmlResponse) { connection.SessionToken = GetTokenFromXMLResponse(xmlResponse); FogBugzGetUserInfoFromEmail(connection, whatToDoNext); };
    Login(email, password, whatToDoWithLoginXMLResult);
}

function FogBugzGetUserInfoFromEmail(connection, whatToDoNext){
    var token = connection.SessionToken;
    var whatToDoWithListPeopleXMLResult = function(xmlResponse) { UpdateUserInfoFromXMLResponseByUserEmail(xmlResponse, connection.LoggedInAs); if (whatToDoNext != null) whatToDoNext(); };
    ListPeople(token, whatToDoWithListPeopleXMLResult);
}

function FogBugzUpdateMilestoneDueDate(connection, whatToDoNext){
    var token = connection.SessionToken;
    var milestoneListing = connection.MilestoneListing[0];

    if (milestoneListing == null) return;

    var whatToDoWithMilestoneXMLResult = function (xmlResponse) {
        var milestoneDueDate = GetMilestoneDueDateFromMilestoneInfoXMLResponse(xmlResponse, milestoneListing.MilestoneId);

        if (milestoneDueDate != null){
            connection.MilestoneListing.forEach(function (nextMilestoneListing){
                nextMilestoneListing.MilestoneDueDate = milestoneDueDate;
            });
        }

        if (whatToDoNext != null) whatToDoNext();
    }
    GetMilestones(milestoneListing.MilestoneId, token, whatToDoWithMilestoneXMLResult);
}

var PhaseUnknown = "unknown";
var KnownPhases = ["milestone transition in", "research", "programming sprint", "milestone transition out"];
var KnownPhaseCases = ["1195", "1196", "1197", "1199"];
function FogBugzUpdateDepartmentStatus(connection, whatToDoNext){
    var loggedInAs = connection.LoggedInAs;
    var token = connection.SessionToken;

    var whatToDoAfterCaseInfoUpdated = function () {
        var phase = PhaseUnknown.toUpperCase();
        if (KnownPhases.contains(loggedInAs.WorkingOnCaseName.toLowerCase())) phase = loggedInAs.WorkingOnCaseName;
        connection.DepartmentPhase = phase;
        if (loggedInAs.WorkingOnStartWorkDate != null) connection.MilestoneStartDate = loggedInAs.WorkingOnStartWorkDate;
        if (whatToDoNext != null) whatToDoNext();
    };

    UpdateUserCaseInfo(loggedInAs, token, whatToDoAfterCaseInfoUpdated);
}

function FogBugzGetPhaseStatuses(connection){
    var activePhase = connection.DepartmentPhase.toLowerCase();
    var phaseStatuses = [];
    phaseStatuses.pushRepeatedValue(0, KnownPhases.length);

    if(KnownPhases.contains(activePhase)) {
        var activeIndex = KnownPhases.indexOf(activePhase);
        phaseStatuses[activeIndex] = 1;
    }

    return phaseStatuses;
}

var DefaultPhaseColor = "red";
var PhaseColors = ["darkseagreen", "bisque", "darksalmon", "darkseagreen"];
function FogBugzGetPhaseColor(phase){    
    if(KnownPhases.contains(phase.toLowerCase())) {
        var colorIndex = KnownPhases.indexOf(phase.toLowerCase());
        return PhaseColors[colorIndex];
    }
    return DefaultPhaseColor;
}

var KnownPhasesDisplay = ["Milestone Transition In", "Research", "Programming Sprint", "Milestone Transition Out"];
function UpdateUserCaseInfo(user, token, whatToDoNext){
    var phase = -1;

    var whatToDoWithWorkingOnCaseTitle = function (caseTitle, caseLastUpdated) {
        if (phase > -1) {
            user.WorkingOnCaseName = KnownPhasesDisplay[phase];
        } else {
            user.WorkingOnCaseName = caseTitle;
        }

        user.WorkingOnStartWorkDate = caseLastUpdated;
        whatToDoNext();
    };

    var whatToDoWithNewWorkingOnCaseId = function (caseId) {
        if (caseId == null) {
            user.WorkingOnCaseId = 0;
            user.WorkingOnCaseName = "Nothing";
            whatToDoNext();
            return;
        }

        if (KnownPhaseCases.contains(caseId)) phase = KnownPhaseCases.indexOf(caseId);

        user.WorkingOnCaseId = caseId;
        var caseIdToLookup = user.WorkingOnCaseId;

        if (phase > -1) caseIdToLookup = KnownPhaseCases[0];
        
        GetCaseTitleAndLastUpdatedFromNumber(user.Id, caseIdToLookup, phase, token, whatToDoWithWorkingOnCaseTitle);
    };

    ListUserWorkingOnCaseId(user.Id, token, whatToDoWithNewWorkingOnCaseId);
}

var CurrentMilestoneFilter = 42;
var FogBugzMilestoneListingCaseColumns = "sFixFor,ixFixFor,backlog,sCategory,ixBug,sProject,sTitle,dtResolved,hrsCurrEst,hrsElapsed,levelxofxeffort"
function FogBugzGetCurrentMilestoneListing(connection, whatToDoNext){
    var token = connection.SessionToken;

    var populatedDueDateAndDoNext = function () {
        FogBugzUpdateMilestoneDueDate(connection, whatToDoNext);
        if (whatToDoNext != null) whatToDoNext();
    };

    whatToDoWithFilterXMLResponse = function (xmlResponse) {
        SearchCasesForMilestoneListing(GetCaseNumbersFromXMLResponse(xmlResponse), FogBugzMilestoneListingCaseColumns, connection, token, populatedDueDateAndDoNext);
    };
    var whatToDoWithXMLResponse = function(xmlResponse) {
        ListCurrentFilter(token, whatToDoWithFilterXMLResponse);
    };
    SetCurrentFilter(CurrentMilestoneFilter, token, whatToDoWithXMLResponse);
}

function SearchCasesForMilestoneListing(caseList, columns, connection, token, whatToDoNext){    
    var whatToDoWithSearchXMLResult = function (xmlResponse) {
        connection.MilestoneListing = GetfogbugzMilestoneListingsFromXMLResponse(xmlResponse, columns);
        if (whatToDoNext != null) whatToDoNext();
    };
    SearchForCases(caseList, columns, token, whatToDoWithSearchXMLResult);    
}

var FogBugzChartInfoCaseColumns = "ixBug,sCategory,dtResolved,hrsCurrEst,hrsElapsed,levelxofxeffort"
function FogBugzGetCurrentMilestoneChartInfo(connection, whatToDoNext){
    var token = connection.SessionToken;
    whatToDoWithFilterXMLResponse = function(xmlResponse) {
        SearchCasesForMilestoneChartInfo(GetCaseNumbersFromXMLResponse(xmlResponse), FogBugzChartInfoCaseColumns, connection, token, whatToDoNext);
    }
    var whatToDoWithXMLResponse = function(xmlResponse){
        ListCurrentFilter(token, whatToDoWithFilterXMLResponse);
    };
    SetCurrentFilter(CurrentMilestoneFilter, token, whatToDoWithXMLResponse);
}

function SearchCasesForMilestoneChartInfo(caseList, columns, connection, token, whatToDoNext){
    whatToDoWithSearchXMLResult = function(xmlResponse) {
        connection.MilestoneChartInfo = GetfogbugzMilestoneChartInfoFromXMLResponse(xmlResponse, columns, connection.MilestoneStartDate);
        if (whatToDoNext != null) whatToDoNext();
    };
    SearchForCases(caseList, columns, token, whatToDoWithSearchXMLResult);
}

function FogBugzGetDeveloperInfo(userEmailCrossRef, connection, whatToDoNext){
    var token = connection.SessionToken;
    var whatToDoWithFilterXMLResponse = function(xmlResponse) {        
        CreateDeveloperInfo(GetCaseNumbersFromXMLResponse(xmlResponse), userEmailCrossRef, connection, whatToDoNext);
    };

    var whatToDoWithXMLResponse = function() {
        ListCurrentFilter(token, whatToDoWithFilterXMLResponse)
    };
    SetCurrentFilter(CurrentMilestoneFilter, token, whatToDoWithXMLResponse);
}

function CreateDeveloperInfo(currentMilestoneCaseList, userEmailCrossRef, connection, whatToDoNext){
    var token = connection.SessionToken;
    var userInfo = [];
    connection.DeveloperInfo = new fogbugzDeveloperInfo(userInfo);

    var first = true;
    var devFunctions = [];
    var getNextFunction = function() { (devFunctions.pop())();};
    userEmailCrossRef.forEach(function(nextEmailUser) {
        var nextToDo;
        if(first) {
            nextToDo = function() {
                FogBugzGetUserActivity(nextEmailUser[0], nextEmailUser[1], connection.DeveloperInfo, currentMilestoneCaseList, token, whatToDoNext);
            };
            first = false;
        } else {            
            nextToDo = function() { 
                FogBugzGetUserActivity(nextEmailUser[0], nextEmailUser[1], connection.DeveloperInfo, currentMilestoneCaseList, token, getNextFunction);
            };
        }
        devFunctions.push(nextToDo);
    });

    (devFunctions.pop())();
}

var FogBugzDeveloperRecentActivityStartDate = new Date((new Date()).setDate((new Date()).getDate() - 21));
var FogBugzDeveloperInfoColumns = "sCategory,ixBug,sTitle,hrsCurrEst,hrsElapsed,dtResolved,dtLastUpdated";
function FogBugzGetUserActivity(userEmail, userName, devInfo, currentMilestoneCaseList, token, whatToDoNext){
    var userActivityList = devInfo.UserInfo;
    var user = new fogbugzUser(userEmail);
    user.Name = userName;
    var userTaskList = [];    
    newUserActivity = new fogbugzUserActivity(user, userTaskList);
    userActivityList.push(newUserActivity);

    var userActivityCases = [];
    var whatToDoWithSearchXMLResult = function(xmlResponse) { PopulateUserTaskListFromXMLResponse(xmlResponse, FogBugzDeveloperInfoColumns, currentMilestoneCaseList, user.WorkingOnCaseId, userActivityCases, userTaskList); if (whatToDoNext != null) whatToDoNext(); };
    var whatToDoWithUserActivityCases = function(activityCases) { userActivityCases = activityCases; SearchForCases(userActivityCases.toArrayByIndex(0), FogBugzDeveloperInfoColumns, token, whatToDoWithSearchXMLResult); };
    var whatToDoAfterUserCaseInfoUpdate = function(){ ListUserActivityCases(FogBugzDeveloperRecentActivityStartDate, null, user.Id, token, whatToDoWithUserActivityCases); };
    var whatToDoAfterUserInfoUpdate = function() { UpdateUserCaseInfo(user, token, whatToDoAfterUserCaseInfoUpdate); };
    var whatToDoWithListPeopleXMLResult = function(xmlResponse) { UpdateUserInfoFromXMLResponseByUserEmail(xmlResponse, user); whatToDoAfterUserInfoUpdate(); };
    ListPeople(token, whatToDoWithListPeopleXMLResult);
}

/*
┌───────────────────────────────────────
│ FogBugz API XML Reponse Processing
└───────────────────────────────────────
*/
function GetTokenFromXMLResponse(xmlResponse){
    return ParseXMLSearchForFirst(xmlResponse, "token");
}

function UpdateUserInfoFromXMLResponseByUserEmail(xmlResponse, user){
    var email = user.Email;
    var fullname = ParseXMLSearchForFirstGrandChildNodeValueByGrandChildNodeSearchValue(xmlResponse, "people", "person", "sFullName", "sEmail", email);
    var personId = ParseXMLSearchForFirstGrandChildNodeValueByGrandChildNodeSearchValue(xmlResponse, "people", "person", "ixPerson", "sEmail", email);

    user.FullName = fullname;
    user.Id = personId;
}

function GetMilestoneDueDateFromMilestoneInfoXMLResponse(xmlResponse, milestoneId){
    var fbDate = ParseXMLSearchForFirstGrandChildNodeValueByGrandChildNodeSearchValue(xmlResponse, "fixfors", "fixfor", "dt", "ixFixFor", milestoneId);
    if (fbDate == null || fbDate == "") return null;
    return fbDate.parseFogBugzDate();
}

function GetCaseNumbersFromXMLResponse(xmlResponse){
    return ParseXMLAllChildPropertyFromParentNode(xmlResponse, "cases", "case", "ixBug");
}

function GetfogbugzMilestoneListingsFromXMLResponse(xmlResponse, columns){
    var rawListing = [];
    rawListing = ParseXMLAllGrandChildNodesWithValuesFromParentNode(xmlResponse, "cases", "case");

    var milestoneListings = [];
    rawListing.forEach(function (nextEntry) {
        var milestoneName = nextEntry["sFixFor"];
        var milestoneId = nextEntry["ixFixFor"];
        var caseType = nextEntry["sCategory"];
        var caseNumber = nextEntry["ixBug"];
        var caseProject = nextEntry["sProject"];
        var caseDesc = nextEntry["sTitle"];
        var resolvedDte = nextEntry["dtResolved"];
        var curHrsEst = nextEntry["hrsCurrEst"];
        var hrsCompleted = nextEntry["hrsElapsed"];
        if (curHrsEst == null || curHrsEst == "") curHrsEst = 0;
        if (hrsCompleted == null || hrsCompleted == "") hrsCompleted = 0;

        caseDesc = format("{0}: {1}", caseProject, caseDesc);

        var percent = 0;
        if (resolvedDte != null && resolvedDte != "" || caseType == ScheduleItemCaseType) {
            percent = 100;
        } else {
            if (hrsCompleted > 0 && curHrsEst > 0) percent = Math.ceil((hrsCompleted / curHrsEst) * 100);
        }

        var backlogPriority = nextEntry["backlog"];
        if (backlogPriority == null || backlogPriority == "") backlogPriority = 9999;

        var percentComplete = format("{0}%", percent);
        var levelOfEffort = nextEntry["levelxofxeffort"];
        var velocity = 0;
        if (levelOfEffort != null && levelOfEffort.length > 0) velocity = levelOfEffort.substr(0, 1);
        var nextMilestoneListing = new fogbugzMilestoneListing(milestoneName, milestoneId, backlogPriority, caseType, caseNumber, caseDesc, percentComplete, resolvedDte, velocity);
        milestoneListings.push(nextMilestoneListing);
    });
     
    return milestoneListings;
}

function GetfogbugzMilestoneChartInfoFromXMLResponse(xmlResponse, columns, milestoneStartDate){
    var rawInfo = [];
    rawInfo = ParseXMLAllGrandChildNodesWithValuesFromParentNode(xmlResponse, "cases", "case");

    var nonZeroLoENonSchedulItemCaseWorkIntervals = [];
    rawInfo.forEach(function (nextEntry) {
        var caseNumber = nextEntry["ixBug"];
        var caseType = nextEntry["sCategory"];
        var resolvedDte = nextEntry["dtResolved"];
        var currenthrsEst = nextEntry["hrsCurrEst"];
        var hrsCompleted = nextEntry["hrsElapsed"];
        var levelOfEffort = nextEntry["levelxofxeffort"];

        var percentComplete = 0;
        if ((resolvedDte != null && resolvedDte != "") || caseType == ScheduleItemCaseType) {
            percentComplete = 1;
        } else {
            if (hrsCompleted != null && hrsCompleted != "") {
                hrsCompleted = parseInt(hrsCompleted);
            } else {
                hrsCompleted = 0;
            }
            if (currenthrsEst != null && currenthrsEst != "") {
                currenthrsEst = parseInt(currenthrsEst);
            } else {
                currenthrsEst = 0;
            }
            if (hrsCompleted == 0 || currenthrsEst == 0) {
                percentComplete = 0;
            } else {
                percentComplete = (hrsCompleted > currenthrsEst) ? 1 : hrsCompleted / currenthrsEst;
            }
        }
                

        var loE = 0;
        if (levelOfEffort != null && levelOfEffort != "") loE = parseInt(levelOfEffort.substr(0, 1));

        var completionDate = new Date();
        if (resolvedDte != null && resolvedDte != "") completionDate = resolvedDte.parseFogBugzDate();

        var caseWorkInterval = new CaseWorkInterval(caseNumber, caseType, milestoneStartDate, currenthrsEst, hrsCompleted, completionDate, percentComplete, loE);

        if (caseWorkInterval.CaseType != ScheduleItemCaseType && caseWorkInterval.LevelOfEffort > 0) nonZeroLoENonSchedulItemCaseWorkIntervals.push(caseWorkInterval);
    });

    if (nonZeroLoENonSchedulItemCaseWorkIntervals.length == 0) {
        var emptyMilestoneChartInfo = new fogbugzMilestoneChartInfo([], [], 0, 0, 0, 0, 0);        

        return emptyMilestoneChartInfo;
    }
    
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var totalLevelOfEffort = nonZeroLoENonSchedulItemCaseWorkIntervals.sumChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetLevelOfEffortProperty());
        
    var maxcompletionDate = nonZeroLoENonSchedulItemCaseWorkIntervals.maxChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetCompletionDateProperty()); 
    var daysSoFar = milestoneStartDate.DaysBetweenThisAnd(maxcompletionDate);
    var totalLoEComplete = nonZeroLoENonSchedulItemCaseWorkIntervals.sumChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetLoECompleteProperty());    
    var totalHoursEstimated = nonZeroLoENonSchedulItemCaseWorkIntervals.sumChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetEstimatedHoursProperty());
    var totalHoursCompleted = nonZeroLoENonSchedulItemCaseWorkIntervals.sumChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetCompletedHoursProperty());

    var avgHoursEstimatedPerLoE = 0;
    var avgHoursCompletedPerLoE = 0;
    if (totalLevelOfEffort > 0) {
        avgHoursEstimatedPerLoE = totalHoursEstimated / totalLevelOfEffort;
        avgHoursCompletedPerLoE = totalHoursCompleted / totalLevelOfEffort;
    }

    var hoursAvailablePerDay = 24;
    var avgDaysPerLoE = 0;
    if (totalLevelOfEffort > 0) {
        if (totalLoEComplete > 0) {
            if (daysSoFar > 0) {
                avgDaysPerLoE = daysSoFar/totalLoEComplete;
            }
        } else {
            if (daysSoFar > 0) {
                if (avgHoursCompletedPerLoE > 0){
                    avgDaysPerLoE = daysSoFar/(avgHoursCompletedPerLoE/hoursAvailablePerDay);
                } else {
                    if (avgHoursEstimatedPerLoE > 0){
                        avgDaysPerLoE = daysSoFar/(avgHoursEstimatedPerLoE/hoursAvailablePerDay);
                    }
                }
            }
        }
    }
    
    var avgVelocityPerDay = 0;    
    if (daysSoFar > 0 && totalLoEComplete > 0) avgVelocityPerDay = totalLoEComplete/daysSoFar;

    var completedCases = [];
    var projectionSeries = [];
    nonZeroLoENonSchedulItemCaseWorkIntervals.forEach(function (nextCaseWorkInterval) {
        if (nextCaseWorkInterval.ProjectedCompletionDate == null) {
            if (nextCaseWorkInterval.PercentComplete < 1) {
                var remainingLoE = nextCaseWorkInterval.LevelOfEffort - nextCaseWorkInterval.LoEComplete;
                var estDaysToComplete = 0;

                if (nextCaseWorkInterval.LoEComplete > 0 && nextCaseWorkInterval.PercentComplete > .5) {
                    var percentOfAvailableVelocity = nextCaseWorkInterval.LoEComplete / totalLoEComplete;
                    var velicityPerDay = percentOfAvailableVelocity * avgVelocityPerDay;
                    estDaysToComplete = remainingLoE / velicityPerDay;
                } else {
                    if (avgVelocityPerDay > 0) {
                        estDaysToComplete = remainingLoE / avgVelocityPerDay;
                    } else {
                        estDaysToComplete = remainingLoE * avgDaysPerLoE;
                    }
                }

                nextCaseWorkInterval.ProjectedCompletionDate = new Date((new Date()).setTime(nextCaseWorkInterval.CompletionDate.getTime() + (oneDay * estDaysToComplete)));
            } else {
                completedCases.push(nextCaseWorkInterval.CaseNumber);
                nextCaseWorkInterval.ProjectedCompletionDate = nextCaseWorkInterval.CompletionDate;
            }
        }

        var nextVector = new fogbugzMilestoneChartVector(nextCaseWorkInterval.CaseNumber, nextCaseWorkInterval.ProjectedCompletionDate, nextCaseWorkInterval.LevelOfEffort);
        projectionSeries.push(nextVector);
    });
        
    var maxProjectedCompletionDate = nonZeroLoENonSchedulItemCaseWorkIntervals.maxChildProperty(nonZeroLoENonSchedulItemCaseWorkIntervals[0].GetProjectedCompletionDateProperty());
    var daysToCompleteMilestoneWork = milestoneStartDate.DaysBetweenThisAnd(maxProjectedCompletionDate);

    var burndownSeries = [];
    if (projectionSeries.length > 0) {
        var condition = function (caseNumber) { return completedCases.contains(caseNumber); };
        projectionSeries.getEntriesByConditionalProperty(projectionSeries[0].GetCaseNumberProperty(), condition).appendTo(burndownSeries);
    }

    if (burndownSeries.length == 0) {
        var noProgressChartVector = new fogbugzMilestoneChartVector(0, maxProjectedCompletionDate, 0);
        burndownSeries.push(noProgressChartVector);
    }
    
    var currentVelocityPerWeek = avgVelocityPerDay * 7;
    var milestoneChartInfo = new fogbugzMilestoneChartInfo(burndownSeries, projectionSeries, totalLevelOfEffort, totalLoEComplete, avgVelocityPerDay, currentVelocityPerWeek, daysToCompleteMilestoneWork);        

    return milestoneChartInfo;
}

function CaseWorkInterval(caseNumber, caseType, startDate, estimatedHours, completedHours, completionDate, percentComplete, levelOfEffort){
    this.CaseNumber = caseNumber;
    this.CaseType = caseType;
    this.StartDate = startDate;
    this.EstimatedHours = estimatedHours;
    this.CompletedHours = completedHours;
    this.CompletionDate = completionDate;
    this.DurationDays = startDate.DaysBetweenThisAnd(completionDate);
    this.PercentComplete = percentComplete;
    this.LevelOfEffort = levelOfEffort;
    this.LoEComplete = (((percentComplete > 1) ? 1 : percentComplete) * levelOfEffort);
    this.ProjectedCompletionDate = null;

    this.GetCaseNumberProperty = function () { return "CaseNumber"; };
    this.GetCaseTypeProperty = function () { return "CaseType"; };
    this.GetStartDateProperty = function () { return "StartDate"; };
    this.GetEstimatedHoursProperty = function () { return "EstimatedHours"; };
    this.GetCompletedHoursProperty = function () { return "CompletedHours"; };
    this.GetCompletionDateProperty = function () { return "CompletionDate"; };
    this.GetDurationDaysProperty = function () { return "DurationDays"; };
    this.GetPercentCompleteProperty = function () { return "PercentComplete"; };
    this.GetLevelOfEffortProperty = function () { return "LevelOfEffort"; };
    this.GetLoECompleteProperty = function () { return "LoEComplete"; };
    this.GetProjectedCompletionDateProperty = function () { return "ProjectedCompletionDate"; };
}

function PopulateUserTaskListFromXMLResponse(xmlResponse, columns, currentMilestoneCaseList, workingOnCaseId, userActivityCases, userTaskList){
    var rawInfo = [];
    rawInfo = ParseXMLAllGrandChildNodesWithValuesFromParentNode(xmlResponse, "cases", "case");

    rawInfo.forEach(function (nextEntry) {
        var caseType = nextEntry["sCategory"];
        var caseNumber = nextEntry["ixBug"];
        var caseDesc = nextEntry["sTitle"];
        var currenthrsEst = nextEntry["hrsCurrEst"];
        var hrsCompleted = nextEntry["hrsElapsed"];
        var resolvedDte = nextEntry["dtResolved"];
        var lastUpdatedDate = nextEntry["dtLastUpdated"];
        if (hrsCompleted == null || hrsCompleted == "") hrsCompleted = 0;
        if (currenthrsEst == null || currenthrsEst == "") currenthrsEst = 0;

        var lastActiveDate = userActivityCases.getValueByKey(caseNumber);

        var percent = 0;
        if (resolvedDte != null && resolvedDte != "" || caseType == ScheduleItemCaseType) {
            percent = 100;
        } else {
            if (hrsCompleted > 0 && currenthrsEst > 0) percent = Math.ceil((hrsCompleted / currenthrsEst) * 100);
        }
        var percentComplete = format("{0}%", percent);

        var nextTaskEntry = new fogbugzUserTaskEntry(caseType, caseNumber, caseDesc, percentComplete, resolvedDte, lastActiveDate, currentMilestoneCaseList.contains(caseNumber), (caseNumber == workingOnCaseId));
        userTaskList.push(nextTaskEntry);
    });
    if (userTaskList.length > 0) userTaskList.sortByProperty(userTaskList[0].GetLastActiveDateProperty(), true);
}

function GetUniqueCaseNumbersAndNewestActiveDatesViaIntervalsFromXMLResponse(xmlResponse){
    var activityList = [];
    var caseList = toArray(ParseXMLAllGrandChildNodeValuesFromParentNodesOptionalValueCheck(xmlResponse, "intervals", "interval", "ixBug", [["fDeleted", "false"]])).distinct();
    caseList.forEach(function (nextCaseNumber) {
        var rawStartDates = toArray(ParseXMLAllGrandChildNodeValuesFromParentNodesOptionalValueCheck(xmlResponse, "intervals", "interval", "dtStart", [["ixBug", nextCaseNumber], ["fDeleted", "false"]])).distinct();
        var startDates = [];
        rawStartDates.forEach(function (nextStartDate) {
            startDates.push(nextStartDate.parseFogBugzDate());
        });        
        var newestStartDate = new Date(new Date().setTime(startDates.max()));    
        activityList.push([nextCaseNumber, newestStartDate]);
    });
    return activityList;
}

function GetUniqueCaseNumbersViaIntervalsIgnoringEmptyEndDateFromXMLResponse(xmlResponse){
    return toArray(ParseXMLUniqueGrandChildNodeValuesFromParentNodesIgnoringEmptyValueNodeOptionalValueCheck(xmlResponse, "intervals", "interval", "ixBug", "dtEnd", "fDeleted", "false")).distinct();    
}

function GetCaseNumberViaIntervalsWithEmptyEndDateFromXMLResponse(xmlResponse){
    return ParseXMLFirstGrandChildNodeValueFromParentNodeWithEmptyValueNode(xmlResponse, "intervals", "interval", "ixBug", "dtEnd");
}

/*
┌───────────────────────────────────────
│ Utilities
└───────────────────────────────────────
*/
function GetPlotPointsFromChartVectors(startY, startDate, chartVectorSeries){
    var chartVectors = [];
    if (chartVectorSeries == null || chartVectorSeries.length == 0) {
        chartVectors.push(new ChartVector(1, 0));
        return chartVectors; 
    }
    var series = chartVectorSeries.sortByProperty(chartVectorSeries[0].GetDateCompletedProperty());

    var previousDate = startDate;
    series.forEach(function(nextVector){
        chartVectors.push(new ChartVector(nextVector.DateCompleted.DaysBetweenThisAnd(previousDate), nextVector.Velocity));
        previousDate = nextVector.DateCompleted;
    });

    return GetChartPlotPointsFromVectors(0, startY, chartVectors, 0, 1);
}

if ( !Date.prototype.toFogBugzDateTimeString ) {
    Date.prototype.toFogBugzDateTimeString = function(){
        var d = this.getFullYear() + "-" + ("0" + (this.getMonth()+1)).slice(-2) + "-" + ("0" + this.getDate()).slice(-2);
        var t = ("0" + this.getHours()).slice(-2) + ":" + ("0" + this.getMinutes()).slice(-2) + ":" + ("0" + this.getSeconds()).slice(-2);
        return d + "T" + t + "Z";
    }
}

if ( !Date.prototype.toFogBugzDateString ) {
    Date.prototype.toFogBugzDateString = function() {
        return this.getFullYear() + "-" + ("0" + (this.getMonth()+1)).slice(-2) + "-" + ("0" + this.getDate()).slice(-2);
    }
}

if ( !String.prototype.parseFogBugzDate ) {
    String.prototype.parseFogBugzDate = function() {
        var iDt = this.match(/(\S+)T/)[1];
        var dtParts = iDt.match(/(\d+)/g);

        var iTm = this.match(/T(\S+)Z/)[1];
        var tParts = iTm.match(/(\d+)/g);
        return new Date(dtParts [0], dtParts [1]-1, dtParts [2], tParts[0], tParts[1], tParts[2]);
    }
}