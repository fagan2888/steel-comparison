import React from 'react'
import { mount } from 'enzyme'
import { buildCSV } from '../../../components/Dashboard/DownloadButton'
import test_data from './test_data'
import expected_csv from './expected_download'

describe('DownloadButton', () => {
  it('should build the correct CSV', () => {
    const results = test_data;
    expect(buildCSV(results)).toEqual(expected_csv);
  })
})