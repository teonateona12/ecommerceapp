#!/usr/bin/env node
import fs from "fs";
import { parse } from "json2csv";
import getOrderReport from "./report.js";
const path = process.argv.slice(2)[0];
const report = getOrderReport();

function exportOrdersReport(path, reportFuntion) {
  const csv = parse(reportFuntion);
  fs.writeFileSync(path, csv);
  console.log(`Report exported to ${path}`);
}

exportOrdersReport(path, report);
