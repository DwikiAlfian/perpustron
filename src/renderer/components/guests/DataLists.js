import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { BsFillPersonPlusFill, BsSearch } from 'react-icons/bs';
import useStatus from 'renderer/hooks/useStatus';
import AdddataModal from './AdddataModal';
import EditdataModal from './EditdataModal';

export default function DataLists({
  datas,
  deleteGuest,
  setCurrentData,
  openDrawer,
}) {
  return (
    <>
      {datas &&
        datas?.map((data, index) => {
          return (
            <>
              <div
                className="book-list-content"
                onClick={(e) => {
                  openDrawer(e);
                }}
              >
                <HiChevronDown className="book-chevron-icon" size={20} />
                <h4>{data?.name}</h4>
                <span className="span-pill" style={{ marginTop: 7 }}>
                  {data?.title}
                </span>
                <div
                  className="container flex-column gap-5"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex-inline flex-align-start flex-justify-between">
                    <div className="flex-column gap-5">
                      <span className="span-text">Purpose : {data?.desc}</span>
                    </div>
                  </div>
                </div>
                <div className="book-buttons">
                  <button
                    className="button-confirm-trans"
                    onClick={(e) => {
                      setCurrentData({
                        index: index,
                        id: data?.id,
                        name: data?.name,
                        title: data?.title,
                        desc: data?.desc,
                      });
                      e.stopPropagation();
                    }}
                  >
                    <RiEdit2Fill size="14" />
                    Edit Data
                  </button>
                  <button
                    className="button-danger-trans"
                    onClick={(e) => {
                      deleteGuest(index);
                      e.stopPropagation();
                    }}
                  >
                    <HiOutlineTrash size="14" />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      {!datas ||
        (datas.length === 0 && (
          <>
            <div
              style={{
                textAlign: 'center',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <h4>No data has been written</h4>
              <span className="span-text">Try add list a data</span>
            </div>
          </>
        ))}
    </>
  );
}
