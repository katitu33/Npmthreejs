import React from 'react';
import PropTypes from 'prop-types';

import { RepoEntryContainer } from './repoEntryStyles';

const RepoEntry = ({
    repoUrl,
    setRepoUrl,
    fetchRepoData
}) => {
    return (
        <RepoEntryContainer>
            <div className="title">
                <h1>npm package check</h1>
                <h2>Enter a github repo below</h2>
            </div>
            <div className="input">
                <input
                    value={repoUrl}
                    placeholder="https://github.com/username/repo"
                    onChange={evt => setRepoUrl(evt.target.value)}
                />
                <button
                    onClick={() => fetchRepoData()}
                >
                    Get Data
                </button>
            </div>
        </RepoEntryContainer>
    );
};

RepoEntry.propTypes = {
    repoUrl: PropTypes.string.isRequired,
    setRepoUrl: PropTypes.func.isRequired,
    fetchRepoData: PropTypes.func.isRequired
};

export default RepoEntry;

