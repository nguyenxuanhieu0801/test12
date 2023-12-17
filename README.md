# test12
<div id="table-container">
			<table id="dynamic-table">
				<thead>
					<tr id="table-header">
						<logic:iterate id="header" name="headerFrom" property="listHeader">
							<th>
								<bean:write name="header" property="name" />
							</th>
						</logic:iterate>
					</tr>
				</thead>
				<tbody id="table-body">
					<logic:iterate id="data" name="headerFrom" property="listData">
						<tr>
							<logic:iterate id="header" name="headerFrom" property="listHeader">
								<td>
								
								<logic:equal name="header" property="name" value="Customer Id">
										<bean:write name="data" property="id" />
									</logic:equal>
									<logic:equal name="header" property="name" value="Customer Name">
										<bean:write name="data" property="name" />
									</logic:equal>
									<logic:equal name="header" property="name" value="Age">
										<bean:write name="data" property="age" />
									</logic:equal>
									<logic:equal name="header" property="name" value="Gender">
										<bean:write name="data" property="sex" />
									</logic:equal>
								</td>
							</logic:iterate>
						</tr>
					</logic:iterate>
				</tbody>
			</table>
		</div>

