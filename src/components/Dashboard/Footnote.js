import React from 'react';
import config from '../../config';

const DashboardFootnote = () => {
	return (
    <div className="explorer__dashboard-footnote">
      <button className="explorer__button explorer__link-button pure-button pure-button-primary" type="button" onClick={() => {return window.open(config.monitor_link, '_blank')}} >
        Go to Global Steel Trade Reports
      </button>
      <p> For Questions and Feedback:
      <br /> Steel Import Monitoring and Analysis Team
      <br/> Email: <a href="mailto:ecglobalsteelstats@trade.gov">ecglobalsteelstats@trade.gov</a>  Call: (202) 482-2105</p>
    
      <p> Data Source: Global Trade Atlas; Copyright © IHS Markit Global Inc. 2018.  All rights reserved.  </p>

      <h4 className="explorer__footnote-terms-header">Terms and Conditions:</h4>
      <ol className="explorer__footnote-terms">
        <li>
          The use of this data is not permitted for purposes of any public or private security or debt issue documentation or other offering document.
        </li>
        <li>
          The Department of Commerce & IHS Global Ltd. shall have no liability arising from or related in any form or manner, including use of or reliance upon the data, graphs, or charts for any purpose.
        </li>
        <li>
          Redistribution of the contents of this website is expressly prohibited.
        </li>
      </ol>
    </div>
	);
}

export default DashboardFootnote;