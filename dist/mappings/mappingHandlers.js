"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCouncilVotedEvent = exports.handleCouncilProposedEvent = void 0;
const models_1 = require("../types/models");
async function handleCouncilProposedEvent(event) {
    const { event: { data: [accountId, proposal_index, proposal_hash, threshold], }, } = event;
    const proposal = new models_1.Proposal(proposal_hash.toString());
    proposal.index = proposal_index.toString();
    proposal.account = accountId.toString();
    proposal.hash = proposal_hash.toString();
    proposal.voteThreshold = threshold.toString();
    proposal.block = event.block.block.header.number.toBigInt();
    await proposal.save();
}
exports.handleCouncilProposedEvent = handleCouncilProposedEvent;
async function handleCouncilVotedEvent(event) {
    // logger.info(JSON.stringify(event.event.data));
    const { event: { data: [councilorId, proposal_hash, approved_vote, numberYes, numberNo], }, } = event;
    await ensureCouncillor(councilorId.toString());
    // Retrieve the record by the accountID
    const voteHistory = new models_1.VoteHistory(`${event.block.block.header.number.toNumber()}-${event.idx}`);
    voteHistory.proposalHashId = proposal_hash.toString();
    voteHistory.approvedVote = approved_vote.valueOf();
    voteHistory.councillorId = councilorId.toString();
    voteHistory.votedYes = numberYes.toNumber();
    voteHistory.votedNo = numberNo.toNumber();
    voteHistory.block = event.block.block.header.number.toNumber();
    // logger.info(JSON.stringify(voteHistory));
    await voteHistory.save();
}
exports.handleCouncilVotedEvent = handleCouncilVotedEvent;
async function ensureCouncillor(accountId) {
    // ensure that our account entities exist
    let councillor = await models_1.Councillor.get(accountId);
    if (!councillor) {
        councillor = new models_1.Councillor(accountId);
        councillor.numberOfVotes = 0;
    }
    councillor.numberOfVotes += 1;
    await councillor.save();
}
